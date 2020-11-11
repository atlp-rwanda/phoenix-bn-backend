import Util from '../helpers/utils';
import commentService from '../services/commentService';
import request from '../services/tripsService';

const util = new Util();
export default class commentsController {
  static async createComment(req, res) {
    try {
      const findRequest = await request.findById(req.params.id);
      if (!findRequest) {
        util.setError(400, 'Request not Found');
        return util.send(res);
      }
      const { id } = req.userInfo;
      const comment = {
        user_id: id,
        request_id: req.params.id,
        comment: req.body.comment,
      };
      const savedcomment = await commentService.createComment(comment);
      util.setSuccess(201, 'Comment Sent');
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async RequestComments(req, res) {
    try {
      const findRequest = await request.findById(req.params.id);
      if (!findRequest) {
        util.setError(400, 'Request not Found');
        return util.send(res);
      }
      const comments = await commentService.findByProp({ request_id: req.params.id });
      util.setSuccess(200, 'request Comments', comments);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}
