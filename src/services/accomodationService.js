import models from '../models';

const { Accomodation } = models;
/**
 * @exports
 * @class AccomodationService
 */
class AccomodationService {
  /**
   * create new user
   * @static createAccomodation
   * @param {object} newaccomodation
   * @memberof accomodationService
   * @returns {object} data
   */
  static createAccomodation(newAccomodation) {
    return Accomodation.create(newAccomodation);
  }

  static updateAtt(set, prop) {
    return Accomodation.update(set, {
      where: prop,
    });
  }

  static getAccomodations() {
    return Accomodation.findAll();
  }

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByName(prop) {
    return Accomodation.findOne({
      where: prop,
    });
  }

  static findById(modelId) {
    return Accomodation.findOne({
      where: { id: modelId },
    });
  }

  static deleteAccomodation(modelId) {
    return Accomodation.deleteOne({
      where: { id: modelId },
    });
  }
}
export default AccomodationService;
