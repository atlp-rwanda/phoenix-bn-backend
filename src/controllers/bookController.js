import roomsService from '../services/roomsService';
import accomodationService from '../services/accomodationService';
import Util from '../helpers/utils';
import { eventEmitter } from '../helpers/notifications/eventEmitter'

const util = new Util();

export default class controller {
  static async bookAccomodation(req, res) {
    try {
      const roomInfos = {
        userId: req.userInfo.id,
        accomodation_id: req.body.accomodation_id,
        checkIn: new Date(req.body.checkIn).setHours(0,0,0,0),
        checkOut: new Date(req.body.checkOut).setHours(0,0,0,0),

      };
      const userId = roomInfos.userId;
      const accomodation_id = roomInfos.accomodation_id;
      const checkIn = req.body.checkIn;
      const checkOut = req.body.checkOut;

      const newRoom = await roomsService.create(roomInfos);

      const accomodation = await accomodationService.findById(accomodation_id);

      if (accomodation.roomsLeft > 0) {
        await accomodationService.updateAtt({ roomsLeft: (accomodation.roomsLeft - 1) }, { id: roomInfos.accomodation_id });
        const data = {
          userId, accomodation_id, checkIn, checkOut,
        };
        const message = 'You have successfully booked an accomodation';
        util.setSuccess(200, message, data);
        return util.send(res);
      }
      util.setError(400, 'The accomodation is fully occupied');
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async checkAvailability(req, res) {
    try {
      const { accomodation_id } = req.body;
      const accomodations = await accomodationService.findByAccomoId({ id: accomodation_id });

      const message = 'This is the available rooms';
      util.setSuccess(200, message, accomodations);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async findBookings(req, res) {
    try {
      const { id } = req.userInfo;
      const accomodations = await roomsService.findByRoomStatus(id);
      const message = 'This is the accomodations you have booked';
      util.setSuccess(200, message, accomodations);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }
  static async checkOutUser(){
    const date = new Date();
    const CheckingDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    const roomsToBeAvailable = await roomsService.findByProp({ checkOut: CheckingDate});
    if(roomsToBeAvailable){
        roomsToBeAvailable.every(async (room) => { 
            if(room.Status === 'active'){
                await roomsService.updateAtt({ Status: 'inactive' }, { id: room.id }); 
                const accomodationWithRommToFree = await accomodationService.findById(room.accomodation_id); 
                await accomodationService.incrementRooms(accomodationWithRommToFree.id); 
                eventEmitter.emit('checkoutMessage', { id:room.userId, accomodation_id: room.accomodation_id, checkoutDate: room.checkOut });
            }
        })
    }
  }
}
