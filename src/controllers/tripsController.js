/* eslint-disable radix */
import { countBy } from 'lodash';
import Util from '../helpers/utils';
import tripsService from '../services/tripsService';
import { eventEmitter } from '../helpers/notifications/eventEmitter';

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
      const newTripRequest = await tripsService.createTrip(trip);
      eventEmitter.emit('tripRequestCreated', newTripRequest);
      util.setSuccess(201, 'Trip request Saved');
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async myTrips(req, res) {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startIndex = (page - 1) * limit;
      const endIndex = (page * limit);
      const result = {};
      result.next = {
        page: page + 1,
        limit,
      };
      if (startIndex > 0) {
        result.prev = {
          page: page - 1,
          limit,
        };
      }
      const { id } = req.userInfo;
      const trips = await tripsService.findByProp({ user_id: id });
      result.result = trips.slice(startIndex, endIndex);
      util.setSuccess(200, 'My Trip Requests', result);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async reports(req, res) {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startIndex = (page - 1) * limit;
      const endIndex = (page * limit);
      const result = {};
      result.next = {
        page: page + 1,
        limit,
      };
      if (startIndex > 0) {
        result.prev = {
          page: page - 1,
          limit,
        };
      }
      const { id } = req.userInfo;
      const trips = await tripsService.findByProp({ line_manager: id });
      result.result = trips.slice(startIndex, endIndex);
      util.setSuccess(200, 'Trip requests', result);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async approveRequest(req, res) {
    try {
      const requestId = req.body.requestId;
      const tripToApprove = await tripsService.findById(requestId);
      if (!tripToApprove) {
        const error = new Error('The trips request you are trying to approve is not exist in our records');
        error.statusCode = 500;
        throw error;
      }
      const approve = await tripsService.updateAtt({ status: 'approved' }, { id: requestId });
      if (!approve) {
        const error = new Error('This request is not longer exist in you report');
        throw error;
      } else {
        eventEmitter.emit('tripRequestApproveReject', requestId, 'Approved');
        util.setSuccess(200, 'Trip approved');
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async rejectRequest(req, res) {
    try {
      const requestId = req.body.requestId;
      const tripToReject = await tripsService.findById(requestId);
      if (!tripToReject) {
        const error = new Error('The trips request you are trying to reject is not exist in our records');
        error.statusCode = 500;
        throw error;
      }
      if (requestId) {
        const approve = await tripsService.updateAtt({ status: 'Rejected' }, { id: requestId });
        eventEmitter.emit('tripRequestApproveReject', requestId, 'Rejected');
        util.setSuccess(200, 'Your trip request was rejected');
        return util.send(res);
      }
      const error = new Error('This request is not longer exist in you report');
      error.statusCode = 500;
      throw error;
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async editTripRequest(req, res) {
    try {
      const { id } = req.userInfo;
      const {
        Tid, travelDate, returnDate, destination, origin, accomodation, reason,
      } = req.body;
      const tripToEdit = await tripsService.findById(Tid);
      if (!tripToEdit) {
        const error = new Error('The trips request you are trying toEdit is not exist in our records');
        error.statusCode = 500;
        throw error;
      }
      const trips = await tripsService.updateAtt({
        travelDate, returnDate, destination, origin, accomodation, reason,
      }, { id: Tid, status: 'Rejected' });

      if (!id || trips[0] === 0) {
        const error = new Error('You can only edit rejected trip request');
        error.statusCode = 500;
        throw error;
      } else {
        eventEmitter.emit('cancelEditRequest', Tid, 'Edited');
        util.setSuccess(200, 'Trip requests updated successful');
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async cancelMytripRequest(req, res) {
    try {
      const { id } = req.body;
      const tripToCancel = await tripsService.findById(id);
      if (!tripToCancel) {
        const error = new Error('The trips request you are trying to cancel is not exist in our records');
        error.statusCode = 500;
        throw error;
      }
      const trips = await tripsService.cancelTrip(id);
      if (trips === 0) {
        const error = new Error('Only trip request that has not been accepted can be deleted');
        error.statusCode = 500;
        throw error;
      } else {
        eventEmitter.emit('cancelEditRequest', id, 'canceled');
        util.setSuccess(200, 'This trip requests is canceled');
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}
