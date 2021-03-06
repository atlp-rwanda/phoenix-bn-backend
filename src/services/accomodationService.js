import { Op } from 'sequelize';
import models from '../models';

const {
  Accomodations, location, reviews, Users,
} = models;
/**
 * @exports
 * @class AccomodationsService
 */
class AccomodationsService {
  /**
     * create new user
     * @static createAccomodations
     * @param {object} newAccomodations
     * @memberof AccomodationsService
     * @returns {object} data
     */
  static create(newAccomodations) {
    return Accomodations.create(newAccomodations);
  }

  static updateAtt(set, prop) {
    return Accomodations.update(set, {
      where: prop,
    });
  }
  static incrementRooms(id) {
    return Accomodations.increment({roomsLeft: 1}, { where: { id } })
  }

  static getAccomodations() {
    return Accomodations.findAll({
      include: [{
        model: location,
        as: 'location',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id'],
        },
      }],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  /**
     * Find a User in storage using login credentials.
     * @param {*} prop HTTP request
     * @returns {*} JSON data
     */
  static findByProp(prop) {
    return Accomodations.findAll({
      where: prop,
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
    });
  }

  static findById(modelId) {
    return Accomodations.findOne({
      where: { id: modelId },
      include: {
        model: reviews,
        as: 'Reviews',
        attributes: ['rate', 'comment'],
        include: {
          model: Users,
          as: 'userInfo',
          attributes: ['firstName', 'email', 'profilePicture'],
        },
      },
    });
  }

  static findByIdAndLocation(Id, destination) {
    return Accomodations.findOne({
      where: {
        id: Id,
        location_id: {
          [Op.in]: destination,
        },
      },
    });
  }

  static deleteAccomodation(modelId) {
    return Accomodations.destroy({ where: { id: modelId } });
  }

  static findByAccomoId(prop) {
    return Accomodations.findAll({
      where: prop,
      attributes: {
        exclude: ['image', 'amenities', 'location_id', 'description', 'updatedAt', 'createdAt'],
      },
    });
  }
}
export default AccomodationsService;
