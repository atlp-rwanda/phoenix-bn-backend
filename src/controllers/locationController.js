import Util from '../helpers/utils';
import LocationService from '../services/locationService';

const util = new Util();
export default class Location {
  static async allLocation(req, res) {
    try {
      const Locations = await LocationService.getLocations();
      util.setSuccess(200, 'all Locations', Locations);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Unable to retrieve all Locations');
      return util.send(res);
    }
  }

  static async saveLocation(req, res) {
    try {
      const newLocation = {
        name: req.body.name,
        type: req.body.type,
        post_code: req.body.post_code,
        simiraLocations: req.body.simiraLocations,
        LocationNumber: req.body.LocationNumber,
        cost: req.body.cost,
        accomodation_id: req.body.accomodation_id,
        status: req.body.status,
      };
      const createdLocation = await LocationService.createLocation(newLocation);
      util.setSuccess(200, 'Location created', createdLocation);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Location not created');
      return util.send(res);
    }
  }

  static async findLocation(req, res) {
    try {
      const modelId = req.params.id;
      const singleLocation = await LocationService.findById(modelId);
      util.setSuccess(200, 'Successfully retrieved Location', singleLocation);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Location was not retrived');
      return util.send(res);
    }
  }

  static async findLocationByProp(req, res) {
    try {
      const nameProp = {
        name: req.params.name,
      };
      const singleLocation = await LocationService.findByName(nameProp);
      util.setSuccess(200, 'Successfully retrieved Location', singleLocation);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'sorry Location was not retrieved');
      return util.send(res);
    }
  }

  static async updateLocation(req, res) {
    try {
      const updateLocation = {
        name: req.body.name,
        type: req.body.type,
        post_code: req.body.post_code,
        simiraLocations: req.body.simiraLocations,
        LocationNumber: req.body.LocationNumber,
        cost: req.body.cost,
        accomodation_id: req.body.accomodation_id,
        status: req.body.status,
      };
      const prop = {
        id: req.params.id,
      };
      const updatedLocation = await LocationService.updateAtt(updateLocation, prop);
      util.setSuccess(200, 'Location updated successfuly', updatedLocation);
      console.log(updatedLocation);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Location not deleted');
      return util.send(res);
    };
  };

  static async deleteLocation(req, res) {
    try {
      const modelId = req.params.id;
      const deletedLocation = await LocationService.deleteLocation(modelId);
      util.setSuccess(200, 'Location deleted successfully', deletedLocation);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Location was not deleted');
      return util.send(res);
    }
  }
}
