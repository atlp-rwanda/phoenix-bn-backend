import Util from '../helpers/utils';
import roleService from '../services/roleService';

const util = new Util();
export default class Role {
  static async allRole(req, res) {
    try {
      const roles = await roleService.getRoles();
      util.setSuccess(200, 'all roles', roles);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Unable to retrieve all roles');
      return util.send(res);
    }
  }

  static async saveRole(req, res) {
    try {
      const newRole = {
        name: req.body.name,
      };
      const createdRole = await roleService.createRole(newRole);
      util.setSuccess(200, 'Role created', createdRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async findRole(req, res) {
    try {
      const modelId = req.params.id;
      const singleRole = await roleService.findById(modelId);
      util.setSuccess(200, 'Successfully retrieved Role', singleRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Role was not retrived');
      return util.send(res);
    }
  }

  static async findRoleByName(req, res) {
    try {
      const nameProp = {
        name: req.params.name,
      };
      const singleRole = await roleService.findByName(nameProp);
      util.setSuccess(200, 'Successfully retrieved Role', singleRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'sorry Role was not retrieved');
      return util.send(res);
    }
  }

  static async updateRole(req, res) {
    try {
      const updateRole = {
        name: req.body.name,
      };
      const prop = {
        id: req.params.id,
      };
      const updatedRole = await roleService.updateAtt(updateRole, prop);
      util.setSuccess(200, 'Role updated successfuly', updatedRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Role not deleted');
      return util.send(res);
    }
  }

  static async deleteRole(req, res) {
    try {
      const modelId = req.params.id;
      const deletedRole = await roleService.deleteRole(modelId);
      util.setSuccess(200, 'Role deleted successfully', deletedRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Role was not deleted');
      return util.send(res);
    }
  }
}
