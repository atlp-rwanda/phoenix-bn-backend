import accomodationService from '../services/accomodationService';
import Util from '../helpers/utils';
import { cloudinaryUploader } from '../helpers/cloudinaryUploader';

const util = new Util();
export default class controller {
  static async createAccomodation(req, res) {
    try {
      const { path } = req.files[0];
      const image = await cloudinaryUploader(path);
      const accomodation = {
        name: req.body.name,
        description: req.body.description,
        location_id: req.body.location_id,
        amenities: req.amenities,
        capacity: req.body.capacity,
        roomsLeft: req.body.roomsLeft,
        image,
      };
      const newAccomodation = await accomodationService.create(accomodation);
      util.setSuccess(201, 'Accomodation Created', newAccomodation);
      util.send(res);
    } catch (error) {
      util.setError(500, error);
      util.send(res);
    }
  }

  static async getAccomodationsBylocation(req, res) {
    try {
      const { location_id } = req.params;
      const accomodations = await accomodationService.findByProp({ location_id });
      util.setSuccess(200, 'Accomodations', accomodations);
      util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async getAccomodations(req, res) {
    try {
      const accomodations = await accomodationService.getAccomodations();
      util.setSuccess(200, 'Accomodations', accomodations);
      util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async deleteAccomodations(req, res) {
    try {
      const { accomodation } = req.params;
      const removeAccomodation = await accomodationService.deleteAccomodation(accomodation);
      if (removeAccomodation) {
        util.setSuccess(200, 'Accomodation deleted');
        util.send(res);
      } else {
        util.setSuccess(500, 'Accomodation was not  deleted');
        util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async updatableFields(req, res, next) {
    try {
      const updaterPayload = {};
      let op;
      for (op of Object.entries(req.body)) {
        if (op[0] === 'amenities') {
          updaterPayload[op[0]] = JSON.parse(op[1]);
        } else {
          updaterPayload[op[0]] = op[1];
        }
      }
      if (req.files) {
        updaterPayload.image = req.files[0].filename;
      }
      req.newAccomodationData = updaterPayload;
      next();
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async updateAccomodation(req, res) {
    try {
      const { newAccomodationData } = req;
      const target = {
        id: req.params.accomodation,
      };
      const newData = await accomodationService.updateAtt(newAccomodationData, target);
      if (newData) {
        util.setError(200, 'Accomodation Updated!');
        util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async oneAccomodation(req, res) {
    try {
      const { accomodation } = req.params;
      const info = await accomodationService.findById(accomodation);
      util.setSuccess(200, 'Sucess', info);
      util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }
}
