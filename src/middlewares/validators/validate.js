/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  signupValidateSchema,
  passwordResetSchema,
  passwordSchema,
  tripSchema,
  locationSchema,
  accomodationSchema,
  accomodationUpdateSchema,
  rooms,
} from '../../helpers/validateSchema';
import userService from '../../services/userService';
import roleService from '../../services/roleService';
import accomodationService from '../../services/accomodationService';
import locationService from '../../services/locationService';
import { cloudinaryUploader } from '../../helpers/cloudinaryUploader';

import Util from '../../helpers/utils';
import {
  joiValidationError,
} from '../../helpers/joiErrorTemplate';
import {
  decodeToken,
} from '../verifications/verifyToken';

const util = new Util();
export default class validator {
  static async signupValidate(req, res, next) {
    try {
      const getEmail = await userService.findByProp({
        email: req.body.email,
      });
      if (getEmail[0]) {
        util.setError(409, 'Email already exists');
        return util.send(res);
      }
      const {
        error,
      } = signupValidateSchema.validate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });
      return joiValidationError(req, res, next, error);
    } catch (error) {
      util.setError(500, error.message.replace('/', '').replace(/"/g, '').replace('WHERE parameter', ''));
      return util.send(res);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const data = await decodeToken(req.params.token);
      const userExist = await userService.findByProp({
        id: data.userId,
      });
      if (userExist[0]) {
        const isVerified = await userService.findByProp({
          isVerified: true,
          id: data.userId,
        });
        if (isVerified[0]) {
          util.setError(422, 'Your account is already verified');
          return util.send(res);
        }
        res.id = data.userId;
        next();
      } else {
        util.setError(404, 'Sorry we can\'t find your account');
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async validateEmail(req, res, next) {
    try {
      const { error } = passwordResetSchema.validate({
        email: req.body.email,
      });

      if (error) {
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        util.setError(400, Error);
        return util.send(res);
      }
      next();
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async verifyAdmin(req, res, next) {
    try {
      const data = await decodeToken(req.headers.authorization);
      const { RoleId } = data;
      if (RoleId === 1) {
        next();
      } else {
        util.setError(403, 'Un authorized access');
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async passwordMatch(req, res, next) {
    try {
      const {
        error,
      } = passwordSchema.validate({
        token: req.params.token,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });
      if (error) {
        if (
          error.details[0].message
            .replace('/', '')
            .replace(/"/g, '')
            .includes('confirmPassword')
        ) {
          const Error = {
            error: 'passwords don\'t match',
          };
        }
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        util.setError(400, Error);
        return util.send(res);
      }
      next();
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async roleExist(req, res, next) {
    try {
      const { roleId } = req.body;
      if (roleId) {
        const roleAvailable = await roleService.findById(roleId);
        if (!roleAvailable) {
          util.setError(400, 'Role you want to assign don\'t exists');
          return util.send(res);
        }
        next();
      } else {
        util.setError(400, 'roleId is missing');
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async tripRequest(req, res, next) {
    try {
      const { error } = tripSchema.validate(req.body);
      if (error) {
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        util.setError(400, Error);
        return util.send(res);
      }
      console.log('retuned to next');
      next();
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async checkDates(req, res, next) {
    try {
      const datetime = new Date();
      const date = datetime.toISOString().slice(0, 10);
      const { travelDate, returnDate } = req.body;
      if (travelDate >= date) {
        if (returnDate) {
          if (returnDate < travelDate) {
            util.setError(400, 'returning date should be greater than travelling date');
            return util.send(res);
          }
          req.tripType = 'returning';
          next();
        } else {
          req.tripType = 'one way';
          next();
        }
      } else {
        util.setError(400, 'Travel date can\'t be in past');
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async destinations(req, res, next) {
    try {
      const { destination } = req.body;
      console.log(destination);
      const destinations = await locationService.getLocations(destination);
      if (destinations && destination.length === destinations.length) {
        next();
      } else {
        util.setError(404, 'Location(s) Not found');
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async checkAcommodation(req, res, next) {
    try {
      const { destination } = req.body;
      const accomodation = req.body.accomodation || req.params.accomodation;
      const checkByLocation = await accomodationService.findByIdAndLocation(accomodation, destination);
      if (!checkByLocation) {
        util.setError(404, 'Accomodation not found in any of the destination(s) you provided');
        return util.send(res);
      }
      next();
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async Acommodation(req, res, next) {
    try {
      const id = req.params.accomodation;
      const findById = await accomodationService.findById(id);
      if (!findById) {
        util.setError(404, 'Accomodation not found');
        return util.send(res);
      }
      next();
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async location(req, res, next) {
    try {
      const { error } = locationSchema.validate(req.body);
      if (error) {
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        util.setError(400, Error);
        return util.send(res);
      }
      next();
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async accomodation(req, res, next) {
    try {
      const amenities = JSON.parse(req.body.amenities);
      const accomodation = {
        name: req.body.name,
        description: req.body.description,
        location_id: req.body.location_id,
        amenities,
        image: req.body.image,
        numberOfRooms: req.body.numberOfRooms,
        roomsAvailable: req.body.roomsAvailable,
      };
      const { error } = accomodationSchema.validate(accomodation);
      if (error) {
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        util.setError(400, Error);
        util.send(res);
      }
      req.amenities = amenities;
      next();
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async accomodationUpdate(req, res, next) {
    try {
      const { error } = accomodationUpdateSchema.validate(req.body);
      if (error) {
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        util.setError(400, Error);
        util.send(res);
      }
      next();
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async roomImages(req, res, next) {
    try {
      const images = [];

      if (req.files.length > 0) {
        for (const op of req.files) {
          const ImageUrl = await cloudinaryUploader(op.path);
          images.push(ImageUrl);
        }
        req.images = images;
        next();
      } else {
        util.setError(400, 'Provide one image at least');
        util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async room(req, res, next) {
    try {
      const { error } = rooms.validate(req.body);
      if (error) {
        const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
        util.setError(400, Error);
        util.send(res);
      }
      next();
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }
}
