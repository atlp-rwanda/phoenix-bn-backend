import models from '../models';

const { rolePermission } = models;

/**
 * @exports
 * @class PermissionService
 */
class rolePermissionService {
  /**
   * create new user
   * @static createrolePermission
   * @param {object} newrolePermission
   * @memberof permissionService
   * @returns {object} data
   */
  static getRolePermissions() {
    return rolePermission.findAll();
  }

  static createRolePermission(newrolePermission) {
    return rolePermission.create(newrolePermission);
  }

  static updateAtt(set, prop) {
    return rolePermission.update(set, {
      where: prop,
    });
  }

  /**
   * Find a User in storage using login credentials.
   * @param {*} prop HTTP request
   * @returns {*} JSON data
   */
  static findByRole(prop) {
    return rolePermission.findAll({
      where: prop,
    });
  }

  static findByPermission(prop) {
    return rolePermission.findAll({
      where: prop,
    });
  }

  static findById(modelId) {
    return rolePermission.findOne({
      where: { id: modelId },
    });
  }

  static deletePermission(modelId) {
    return rolePermission.deleteOne({
      where: { id: modelId },
    });
  }
}
export default rolePermissionService;
