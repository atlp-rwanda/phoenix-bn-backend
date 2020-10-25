import Util from '../helpers/utils';
import permissionService from '../services/permissionService';

const util = new Util();
export default class Permission {
  static async allPermission(req, res) {
    try {
      const permissions = await permissionService.getPermissions();
      util.setSuccess(200, 'all permissions', permissions);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Unable to retrieve all permissions');
      return util.send(res);
    }
  }

  static async savePermission(req, res) {
    try {
      const newPermission = {
        name: req.body.name,
      };
      const createdPermission = await permissionService.createPermission(newPermission);
      util.setSuccess(200, 'Permission created', createdPermission);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'permission not created');
      return util.send(res);
    }
  }

  static async findPermission(req, res) {
    try {
      const modelId = req.params.id;
      const singlePermission = await permissionService.findById(modelId);
      util.setSuccess(200, 'Successfully retrieved permission', singlePermission);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Permission was not retrived');
      return util.send(res);
    }
  }

  static async findPermissionByName(req, res) {
    try {
      const nameProp = {
        name: req.params.name,
      };
      const singlePermission = await permissionService.findByName(nameProp);
      util.setSuccess(200, 'Successfully retrieved permission', singlePermission);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'sorry permission was not retrieved');
      return util.send(res);
    }
  }

  static async updatePermission(req, res) {
    try {
      const updatePermission = {
        name: req.body.name,
      };
      const prop = {
        id: req.params.id,
      };
      const updatedPermission = await permissionService.updateAtt(updatePermission, prop);
      util.setSuccess(200, 'Permission updated successfuly', updatedPermission);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Permission not deleted');
      return util.send(res);
    }
  }

  static async deletePermission(req, res) {
    try {
      const modelId = req.params.id;
      const deletedPermission = await permissionService.deletePermission(modelId);
      util.setSuccess(200, 'Permission deleted successfully', deletedPermission);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Permission was not deleted');
      return util.send(res);
    }
  }
}
