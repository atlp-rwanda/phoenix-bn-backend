import Util from './utils';

const util = new Util();
export const joiValidationError = (req, res, next, error) => {
  if (error) {
    if (
      error.details[0].message
        .replace('/', '')
        .replace(/"/g, '')
        .includes('email')
    ) {
      const Error = {
        error: error.details[0].message.replace('/', '').replace(/"/g, ''),
        example: 'xxx@yyy.zzz',
      };
      util.setError(400, Error);
      return util.send(res);
    }
    if (
      error.details[0].message
        .replace('/', '')
        .replace(/"/g, '')
        .includes('fails to match the required')
    ) {
      const Error = {
        error: 'Incorrect use of special characters',
        tip: 'Please avoid characters that looks like = or /',
      };
      util.setError(400, Error);
      return util.send(res);
    }

    if (
      error.details[0].message
        .replace('/', '')
        .replace(/"/g, '')
        .includes('confirmPassword')
    ) {
      const Error = {
        error: 'passwords don\'t match',
      };
      util.setError(400, Error);
      return util.send(res);
    }

    const Error = error.details[0].message.replace('/', '').replace(/"/g, '');
    util.setError(400, Error);
    return util.send(res);
  }

  return next();
};
