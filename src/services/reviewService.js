import sequelize from 'sequelize';
import models from '../models';

const { reviews } = models;
/**
 * @exports
 * @class reviewsService
 */
class reviewsService {
  /**
     * create new reviews
     * @static createreviews
     * @param {object} newReviews
     * @memberof reviewsService
     * @returns {object} data
     */
  static createreviews(newReviews) {
    return reviews.create(newReviews);
  }

  static getAverage(id) {
    return reviews.findAll({
      where: { accomodation: id },
      attributes: [[sequelize.fn('AVG', sequelize.col('rate')), 'rates']],
    });
  }

  static updateAtt(set, prop) {
    return reviews.update(set, {
      where: prop,
    });
  }

  static findByProp(prop) {
    return reviews.findOne({
      where: prop,
    });
  }
}
export default reviewsService;
