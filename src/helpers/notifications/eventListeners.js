/* eslint-disable camelcase */
import { eventEmitter } from './eventEmitter';
import userServices from '../../services/userService';
import notificationController from '../../controllers/notificationsController';
import tripsService from '../../services/tripsService';

const findUserById = async (id) => await userServices.findById(id);
const { notifyTheUser } = notificationController;
eventEmitter.on('userAssignedToManager', async (payload) => {
  const { lineManagerId, userId } = payload;
  const lineManagerInfo = await findUserById(lineManagerId);
  const userInfo = await findUserById(userId);
  if (userInfo && lineManagerInfo) {
    notifyTheUser({
      receiver: userId,
      message: `Hello! ${userInfo.firstName}  You have been assigned to ${lineManagerInfo.firstName} as your line manager`,
    }, userInfo.email);
  }
});

eventEmitter.on('tripRequestCreated', async (tripRequest) => {
  const receiverInfo = await findUserById(tripRequest.line_manager);
  notifyTheUser({
    tripId: tripRequest.id,
    receiver: receiverInfo.id,
    message: `A new ${tripRequest.type} trip  from ${tripRequest.origin} on the ${tripRequest.travelDate} was requested`,
  }, receiverInfo.email);
});

eventEmitter.on('tripRequestApproveReject', async (tripRequestId, action) => {
  const tripData = await tripsService.findById(tripRequestId);
  const receiverInfo = await findUserById(tripData.user_id);
  notifyTheUser({
    tripId: tripRequestId,
    receiver: receiverInfo.id,
    message: `A  ${tripData.type} trip  request  from from ${tripData.origin} on ${tripData.travelDate} was ${action}`,
  }, receiverInfo.email);
});

eventEmitter.on('cancelEditRequest', async (tripRequestId, action) => {
  const tripData = await tripsService.findById(tripRequestId);
  const receiverInfo = await findUserById(tripData.line_manager);
  notifyTheUser({
    tripId: tripRequestId,
    receiver: receiverInfo.id,
    message: `A  ${tripData.type} trip  request  from ${tripData.origin} on ${tripData.travelDate}  was ${action}`,
  }, receiverInfo.email);
});

eventEmitter.on('commentedOnTripRequest', async (info) => {
  const { id, comment, request } = info;
  const {
    user_id, line_manager, origin, travelDate,
  } = await tripsService.findById(request);
  const receiver = (id === user_id) ? line_manager : id;
  const receiverInfo = await findUserById(receiver);
  notifyTheUser({
    tripId: request,
    receiver,
    message: `You have a new comment on the trip request from ${origin} on ${travelDate} : <b><i>${comment}</i></> `,
  }, receiverInfo.email);
});
