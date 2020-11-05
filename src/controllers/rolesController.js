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
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async saveRole(req, res) {
    try {
      const { name } = req.body;
      const createdRole = await roleService.createRole({ name });
      util.setSuccess(200, 'Role created', createdRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async findRole(req, res) {
    try {
      const { id } = req.params;
      const singleRole = await roleService.findById(id);
      util.setSuccess(200, 'Successfully retrieved Role', singleRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async findRoleByName(req, res) {
    try {
      const { name } = req.params;

      const singleRole = await roleService.findByName({ name });
      util.setSuccess(200, 'Successfully retrieved Role', singleRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async updateRole(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.params;

      const updatedRole = await roleService.updateAtt({ name }, { id });
      util.setSuccess(200, 'Role updated successfuly', updatedRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const deletedRole = await roleService.deleteRole(id);
      util.setSuccess(200, 'Role deleted successfully', deletedRole);
      return util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}
