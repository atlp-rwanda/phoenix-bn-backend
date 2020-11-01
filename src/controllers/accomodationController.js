import Util from '../helpers/utils';
import AccomodationService from '../services/accomodationService';

const util = new Util();
export default class Accomodation {
  static async allAccomodation(req, res) {
    try {
      const Accomodations = await AccomodationService.getAccomodations();
      util.setSuccess(200, 'all Accomodations', Accomodations);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Unable to retrieve all Accomodations');
      return util.send(res);
    }
  }

  static async saveAccomodation(req, res) {
    try {
      const newAccomodation = {
        title: req.body.title,
        location_id: req.body.location_id,
        rooms: req.body.rooms,
        total_price_person: req.body.pricePerPerson,
        price_per_night: req.body.price_per_night,
        description: req.body.description,
        images: req.body.images,
        featured_image: req.body.fImage,
        status: req.body.status,
      };
      const createdAccomodation = await AccomodationService.createAccomodation(newAccomodation);
      util.setSuccess(200, 'Accomodation created', createdAccomodation);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Accomodation not created');
      return util.send(res);
    }
  }

  static async findAccomodation(req, res) {
    try {
      const modelId = req.params.id;
      const singleAccomodation = await AccomodationService.findById(modelId);
      util.setSuccess(200, 'Successfully retrieved Accomodation', singleAccomodation);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Accomodation was not retrived');
      return util.send(res);
    }
  }

    static async findAccomodationByProp(req, res) {
      try {
        const nameProp = {
          name: req.params.name,
        };
        const singleAccomodation = await AccomodationService.findByName(nameProp);
        util.setSuccess(200, 'Successfully retrieved Accomodation', singleAccomodation);
        return util.send(res);
      } catch (error) {
        util.setError(500, 'sorry Accomodation was not retrieved');
        return util.send(res);
      }
    }

  static async updateAccomodation(req, res) {
    try {
      const updateAccomodation = {
        title: req.body.title,
        location_id: req.body.location_id,
        rooms: req.body.rooms,
        total_price_person: req.body.pricePerPerson,
        price_per_night: req.body.price_per_night,
        description: req.body.description,
        images: req.body.images,
        featured_image: req.body.fImage,
        status: req.body.status,
      };
      const prop = {
        id: req.params.id,
      };
      const updatedAccomodation = await AccomodationService.updateAtt(updateAccomodation, prop);
      util.setSuccess(200, 'Accomodation updated successfuly', updatedAccomodation);
      console.log(updatedAccomodation);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Accomodation not deleted');
      return util.send(res);
    }
  }

  static async deleteAccomodation(req, res) {
    try {
      const modelId = req.params.id;
      const deletedAccomodation = await AccomodationService.deleteAccomodation(modelId);
      util.setSuccess(200, 'Accomodation deleted successfully', deletedAccomodation);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Sorry Accomodation was not deleted');
      return util.send(res);
    }
  }
}
