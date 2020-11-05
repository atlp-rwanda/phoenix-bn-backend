import models from '../models';

const { Accomodations } = models;
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
    return Accomodations.findAll();
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

  static deleteTrip(modelId) {
    return Accomodations.deleteOne({
      where: { id: modelId },
    });
  }
}
export default AccomodationsService;
