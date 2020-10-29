import models from '../models';

const { Permission } = models;
/**
 * @exports
 * @class PermissionService
 */
class PermissionService {
  /**
   * create new user
   * @static createPermission
   * @param {object} newpermission
   * @memberof permissionService
   * @returns {object} data
   */
  static createPermission(newPermission) {
    return Permission.create(newPermission);
  }

  static updateAtt(set, prop) {
    return Permission.update(set, {
      where: prop,
    });
  }

  static getPermissions() {
    return Permission.findAll();
  }

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByName(prop) {
    return Permission.findOne({
      where: prop,
    });
  }

  static findById(modelId) {
    return Permission.findOne({
      where: { id: modelId },
    });
  }

  static deletePermission(modelId) {
    return Permission.deleteOne({
      where: { id: modelId },
    });
  }
}
export default PermissionService;
