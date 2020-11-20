import models from '../models';

const { Rooms, Accomodations } = models;
/**
 * @exports
 * @class RoomsService
 */
class RoomsService {
  /**
     * create new user
     * @static createRooms
     * @param {object} newRooms
     * @memberof RoomsService
     * @returns {object} data
     */
  static create(newRooms) {
    return Rooms.create(newRooms);
  }

  static updateAtt(set, prop) {
    return Rooms.update(set, {
      where: prop,
    });
  }

  static getRooms() {
    return Rooms.findAll();
  }

  /**
     * Find a User in storage using login credentials.
     * @param {*} prop HTTP request
     * @returns {*} JSON data
     */
  static findByProp(prop) {
    return Rooms.findAll({
      where: prop,
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
      include: {
        model: Accomodations,
        as: 'accomodation',
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'id', 'description', 'location_id', 'image'],
        },

      },
    });
  }

  static findById(modelId) {
    return Rooms.findOne({
      where: { id: modelId },
    });
  }

  static deleteRoom(modelId) {
    return Rooms.destroy({
      where: { id: modelId },
    });
  }
}
export default RoomsService;
