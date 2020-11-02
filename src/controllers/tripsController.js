import Util from '../helpers/utils';
import tripsService from '../services/tripsService';

const util = new Util();
export default class controller {
  static async createTrip(req, res) {
    try {
      const trip = {
        user_id: req.userInfo.id,
        origin: req.body.origin,
        destination: req.body.destination,
        travelDate: req.body.travelDate,
        returnDate: req.body.returnDate,
        reason: req.body.reason,
        accomodation_id: req.body.accomodation,
        type: req.tripType,
        line_manager: req.lineManager,
        status: 'pending',
      };
      const newTrip = await tripsService.createTrip(trip);
      util.setSuccess(201, 'Trip request Saved');
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async myTrips(req, res) {
    try {
      const { id } = req.userInfo;
      const trips = await tripsService.findByProp({ user_id: id });
      util.setSuccess(200, 'My Trip Requests', trips);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async reports(req, res) {
    try {
      const { id } = req.userInfo;
      const trips = await tripsService.findByProp({ line_manager: id });
      util.setSuccess(200, 'Trip requests', trips);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}
