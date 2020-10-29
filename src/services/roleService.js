import models from '../models';

const { Roles } = models;
/**
 * @exports
 * @class RoleService
 */
class RoleService {
  /**
   * create new user
   * @static createRole
   * @param {object} newRole
   * @memberof RoleService
   * @returns {object} data
   */
  static createRole(newRole) {
    return Roles.create(newRole);
  }

  static updateAtt(set, prop) {
    return Roles.update(set, {
      where: prop,
    });
  }

  static getRoles() {
    return Roles.findAll();
  }

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByName(prop) {
    return Roles.findOne({
      where: prop,
    });
  }

  static findById(modelId) {
    return Roles.findOne({
      where: { id: modelId },
    });
  }

  static deleteRole(modelId) {
    return Roles.findOneAndDelete(modelId);
  }
}
export default RoleService;
