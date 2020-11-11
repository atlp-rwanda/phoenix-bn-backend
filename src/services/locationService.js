import { Op } from 'sequelize';
import models from '../models';

const { location } = models;
/**
 * @exports
 * @class locationservice
 */
class locationservice {
  /**
     * create new user
     * @static createlocation
     * @param {object} newlocation
     * @memberof locationervice
     * @returns {object} data
     */
  static createlocation(newlocation) {
    return location.create(newlocation);
  }

  static updateAtt(set, prop) {
    return location.update(set, {
      where: prop,
    });
  }

  static getlocation() {
    return location.findAll();
  }

  /**
     * Find a User in storage using login credentials.
     * @param {*} prop HTTP request
     * @returns {*} JSON data
     */
  static findByName(prop) {
    return location.findOne({
      where: prop,
    });
  }

  static findById(modelId) {
    return location.findOne({
      where: { id: modelId },
    });
  }

  static getLocations(locations) {
    return location.findAll({
      where: {
        id: {
          [Op.in]: locations,
        },
      },
    });
  }

  static deletelocation(modelId) {
    return location.destroy({ where: { id: modelId } });
  }
}
export default locationservice;
