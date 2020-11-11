import models from '../models';

const { Comment } = models;
/**
 * @exports
 * @class commentService
 */
class commentService {
  /**
     * create new comment
     * @static createcomment
     * @param {object} newcomment
     * @memberof commentService
     * @returns {object} data
     */
  static createComment(newcomment) {
    return Comment.create(newcomment);
  }

  /**
     * Find a User in storage using login credentials.
     * @param {*} prop HTTP request
     * @returns {*} JSON data
     */
  static findByProp(prop) {
    return Comment.findAll({
      where: prop,
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
    });
  }
}
export default commentService;
