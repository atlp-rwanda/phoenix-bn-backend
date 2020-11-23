import { request } from 'chai';
import Util from '../helpers/utils';
import locationService from '../services/locationService';

const util = new Util();
export default class locations {
  static async createLocation(req, res) {
    try {
      const location = {
        name: req.body.name,
      };
      const save = await locationService.createlocation(location);
      util.setSuccess(201, 'Location Created', save);
      util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async updateLocation(req, res) {
    try {
      const { id, name } = req.params;
      const locationExists = await locationService.findById(id);
      if (locationExists) {
        const update = await locationService.updateAtt({ name }, { id });
        if (update) {
          util.setSuccess(200, 'Location Updated');
          util.send(res);
        }
        util.setError(500, 'Failed to update location ');
        util.send(res);
      } else {
        util.setError(404, 'Location you want to update doesn\'t exists');
        util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }

  static async deleteLocation(req, res) {
    try {
      const { id } = req.params;
      const locationExists = await locationService.findById(id);
      if (locationExists) {
        const update = await locationService.deletelocation(id);
        if (update) {
          util.setSuccess(200, 'Location deleted!');
          util.send(res);
        }
        util.setError(500, 'Failed to delete location ');
        util.send(res);
      } else {
        util.setError(404, 'Location you want to delete doesn\'t exists');
        util.send(res);
      }
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }

  static async getLocations(req, res) {
    try {
      const locations = await locationService.getlocation();
      util.setSuccess(200, 'Available Locations', locations);
      util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }
}
