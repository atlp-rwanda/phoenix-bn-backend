import Util from '../helpers/utils';
import roomsService from '../services/roomsService';

const util = new Util();
export default class controller {
  static async createRoom(req, res) {
    try {
      const room = {
        price: req.body.price,
        accomodation_id: req.body.accomodation_id,
        images: req.images,
        details: req.body.details,
        roomNumber: req.body.roomNumber,
      };
      const newRoom = await roomsService.create(room);
      util.setSuccess(201, 'New room was added', newRoom);
      util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async viewRooms(req, res) {
    try {
      const accomodation_id = req.params.accomodation;
      const Room = await roomsService.findByProp({ accomodation_id });
      util.setSuccess(200, 'all rooms', Room);
      util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async deleteRoom(req, res) {
    try {
      const { room } = req.params;
      const roomExists = await roomsService.findById(room);
      if (roomExists) {
        await roomsService.deleteRoom(room);
        util.setSuccess(200, 'Room Deleted');
        util.send(res);
      } else {
        util.setError(404, 'Room Not found');
        util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async updatable(req, res, next) {
    try {
      const updaterPayload = {};
      const images = [];
      let op;
      for (op of Object.entries(req.body)) {
        updaterPayload[op[0]] = op[1];
      }

      if (req.files) {
        for (const i of req.files) {
          images.push(i.filename);
        }
        updaterPayload.images = images;
      }
      req.newRoomData = updaterPayload;
      next();
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async updateRoom(req, res) {
    try {
      const { room } = req.params;
      const { newRoomData } = req;
      const roomExists = await roomsService.findById(room);
      if (roomExists) {
        await roomsService.updateAtt(newRoomData, { id: room });
        util.setSuccess(200, 'Room Updated');
        util.send(res);
      } else {
        util.setError(404, 'Room Not found');
        util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }
}
