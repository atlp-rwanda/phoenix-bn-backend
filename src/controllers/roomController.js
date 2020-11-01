import Util from '../helpers/utils';
import RoomService from '../services/roomService';

const util = new Util();
export default class Room {
  static async allRoom(req, res) {
    try {
      const Rooms = await RoomService.getRooms();
      util.setSuccess(200, 'all Rooms', Rooms);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Unable to retrieve all Rooms');
      return util.send(res);
    }
  }

  static async saveRoom(req, res) {
    try {
      const newRoom = {
        name: req.body.name,
        type: req.body.type,
        simiraRooms: req.body.simiraRooms,
        roomNumber: req.body.roomNumber,
        cost: req.body.cost,
        accomodation_id: req.body.accomodation_id,
        status: req.body.status,
      };
      const createdRoom = await RoomService.createRoom(newRoom);
      util.setSuccess(200, 'Room created', createdRoom);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Room not created');
      return util.send(res);
    }
  }

  static async findRoom(req, res) {
    try {
      const modelId = req.params.id;
      const singleRoom = await RoomService.findById(modelId);
      util.setSuccess(200, 'Successfully retrieved Room', singleRoom);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Room was not retrived');
      return util.send(res);
    }
  }

  static async findRoomByProp(req, res) {
    try {
      const nameProp = {
        name: req.params.name,
      };
      const singleRoom = await RoomService.findByName(nameProp);
      util.setSuccess(200, 'Successfully retrieved Room', singleRoom);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'sorry Room was not retrieved');
      return util.send(res);
    }
  }

  static async updateRoom(req, res) {
    try {
      const updateRoom = {
        name: req.body.name,
        type: req.body.type,
        simiraRooms: req.body.simiraRooms,
        roomNumber: req.body.roomNumber,
        cost: req.body.cost,
        accomodation_id: req.body.accomodation_id,
        status: req.body.status,
      };
      const prop = {
        id: req.params.id,
      };
      const updatedRoom = await RoomService.updateAtt(updateRoom, prop);
      util.setSuccess(200, 'Room updated successfuly', updatedRoom);
      console.log(updatedRoom);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Room not deleted');
      return util.send(res);
    };
  };

  static async deleteRoom(req, res) {
    try {
      const modelId = req.params.id;
      const deletedRoom = await RoomService.deleteRoom(modelId);
      util.setSuccess(200, 'Room deleted successfully', deletedRoom);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Room was not deleted');
      return util.send(res);
    }
  }
}
