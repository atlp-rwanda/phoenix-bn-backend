import Util from '../helpers/utils';
import rolePermissionService from '../services/rolePermissionService';

const util = new Util();
export default class RolePermission {
  static async allRolePermission(req, res) {
    try {
      const rolesPerm = await rolePermissionService.getRolePermissions();
      util.setSuccess(200, 'all roles Permissions', rolesPerm);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Unable to retrieve all rolesPermissions');
      return util.send(res);
    }
  }

  static async saveRolePerm(req, res) {
    try {
      const newrolePermission = {
        role_id: req.body.role_id,
        permission_id: req.body.permission_id,
      };
      const createdRoleperm = await rolePermissionService.createRolePermission(newrolePermission);
      util.setSuccess(200, 'Role permission created', createdRoleperm);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Role not created');
      return util.send(res);
    }
  }

  static async findRolePerm(req, res) {
    try {
      const modelId = req.params.id;
      const singleRole = await rolePermissionService.findById(modelId);
      util.setSuccess(200, 'Successfully retrieved Role', singleRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Role was not retrived');
      return util.send(res);
    }
  }

  static async findRolePermByRole(req, res) {
    try {
      const nameProp = {
        role_id: req.params.prop,
      };
      const singleRolePerm = await rolePermissionService.findByRole(nameProp);
      util.setSuccess(200, 'Successfully retrieved Role_permission', singleRolePerm);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'sorry Role_permission was not retrieved');
      return util.send(res);
    }
  }

  static async findRolePermByPermission(req, res) {
    try {
      const nameProp = {
        permission_id: req.params.prop,
      };
      const singleRolePerm = await rolePermissionService.findByPermission(nameProp);
      util.setSuccess(200, 'Successfully retrieved Role_permission', singleRolePerm);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'sorry Role_permission was not retrieved');
      return util.send(res);
    }
  }

  static async updateRolePerm(req, res) {
    try {
      const updateRole = {
        role_id: req.body.role_id,
        permission_id: req.body.permission_id,
      };
      const prop = {
        id: req.params.id,
      };
      const updatedRole = await rolePermissionService.updateAtt(updateRole, prop);
      util.setSuccess(200, 'Role updated successfuly', updatedRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Role not deleted');
      return util.send(res);
    }
  }

  static async deleteRolePerm(req, res) {
    try {
      const modelId = req.params.id;
      const deletedRole = await rolePermissionService.deleteRole(modelId);
      util.setSuccess(200, 'Role deleted successfully', deletedRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Role was not deleted');
      return util.send(res);
    }
  }
}
