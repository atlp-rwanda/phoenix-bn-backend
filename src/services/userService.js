import bcrypt from 'bcrypt';
import { includes } from 'lodash';
import { Op } from 'sequelize';
import models from '../models';

const { Users } = models;
/**
 * @exports
 * @class UserService
 */
class UserService {
  /**
   * create new user
   * @static createuser
   * @param {object} newuser
   * @memberof userService
   * @returns {object} data
   */
  static createuser(newUser) {
    return Users.create(newUser);
  }

  static findByProp(prop) {
    return Users.findAll({
      where: prop,
    });
  }

  static updateAtt(set, prop) {
    return Users.update(set, {
      where: prop,
    });
  }

  static getUsers(id) {
    return Users.findAll(
      {
        where: {
          lineManager: id, 
          isVerified: true,
        }, attributes: ['id', 'email', 'RoleId', 'lineManager', 'isVerified']
      }
    );
}

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByEmail(prop) {
  return Users.findOne({
    where: { email: prop },
  });
}
  static findById(modelId) {
  return Users.findOne({
    where: { id: modelId },
  });
}
  static findByLineManagerId(lineManagerId) {
  return Users.findOne({
    where: { id: lineManagerId },
  });
}

  // static findByLineManager(lineManagerId) {
  //   return Users.findAll({
  //     where: { 
  //       lineManager: lineManagerId 
  //     }
  //   }).then(Users => res.status(200).send(books));;

  //   // Post.findAll({
  //   //   where: {
  //   //     authorId: 12,
  //   //     status: 'active'
  //   //   }
  //   // });

  // }

  //  static findByProp(prop) {
  //   return Users.findAll({
  //     where: prop,
  //   });
  // }

}
export default UserService;
