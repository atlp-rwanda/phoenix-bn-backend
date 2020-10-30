import models from '../models';

const { trips } = models;
/**
 * @exports
 * @class tripsService
 */
class tripsService {
  /**
   * create new user
   * @static createtrips
   * @param {object} newtrips
   * @memberof tripsService
   * @returns {object} data
   */
  static createTrip(newtrips) {
    return trips.create(newtrips);
  }

  static updateAtt(set, prop) {
    return trips.update(set, {
      where: prop,
    });
  }

  static getTrips() {
    return trips.findAll();
  }

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByProp(prop) {
    return trips.findAll({
      where: prop,
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
    });
  }

  static findById(modelId) {
    return trips.findOne({
      where: { id: modelId },
    });
  }

  static deleteTrip(modelId) {
    return trips.deleteOne({
      where: { id: modelId },
    });
  }
}
export default tripsService;
