import models from '../models';

const { Location } = models;
/**
 * @exports
 * @class LocationService
 */
class LocationService {
  /**
   * create new user
   * @static createLocation
   * @param {object} newLocation
   * @memberof locationService
   * @returns {object} data
   */
  static createLocation(newLocation) {
    return Location.create(newLocation);
  }

  static updateAtt(set, prop) {
    return Location.update(set, {
      where: prop,
    });
  }

  static getLocations() {
    return Location.findAll();
  }

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByName(prop) {
    return Location.findOne({
      where: prop,
    });
  }

  static findById(modelId) {
    return Location.findOne({
      where: { id: modelId },
    });
  }

  static deleteLocation(modelId) {
    return Location.deleteOne({
      where: { id: modelId },
    });
  }
}
export default LocationService;
