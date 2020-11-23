import { Op } from 'sequelize';
import models from '../models';

const { Accomodations, location } = models;
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
}
export default AccomodationsService;
