import models from '../models';

const { Room } = models;
/**
 * @exports
 * @class RoomService
 */
class RoomService {
  /**
   * create new user
   * @static createRoom
   * @param {object} newRoom
   * @memberof roomService
   * @returns {object} data
   */
  static createRoom(newRoom) {
    return Room.create(newRoom);
  }

  static updateAtt(set, prop) {
    return Room.update(set, {
      where: prop,
    });
  }

  static getRooms() {
    return Room.findAll();
  }

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByName(prop) {
    return Room.findOne({
      where: prop,
    });
  }

  static findById(modelId) {
    return Room.findOne({
      where: { id: modelId },
    });
  }

  static deleteRoom(modelId) {
    return Room.deleteOne({
      where: { id: modelId },
    });
  }
}
export default RoomService;
