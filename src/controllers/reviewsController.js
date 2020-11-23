import reviewsService from '../services/reviewService';
import accomodationService from '../services/accomodationService';
import Util from '../helpers/utils';

const util = new Util();

export default class Controller {
  static async addReview(req, res) {
    const { accomodation } = req.params;
    const { rate, comment } = req.body;
    const { id } = req.userInfo;
    try {
      const review = {
        accomodation,
        userId: id,
        rate,
        comment,
      };
      const update = {
        rate,
        comment,
      };
      const Review = (req.reviewed === false) ? await reviewsService.createreviews(review)
        : await reviewsService.updateAtt(update, { userId: id, accomodation });
      const avg = await reviewsService.getAverage(req.params.accomodation);
      const { rates } = JSON.parse(JSON.stringify(avg[0]));
      const averageRating = parseFloat(rates).toFixed(1);
      await accomodationService.updateAtt({ averageRating }, { id: 1 });
      util.setSuccess(200, 'Thanks for taking your time to review this accomodation', Review);
      util.send(res);
    } catch (error) {
      util.setError(500, error.message);
      util.send(res);
    }
  }
}
