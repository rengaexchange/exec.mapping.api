import { AuthenticationRequiredError } from 'common-errors';
import { JoiValidationError } from '../errors';

const errorObject = (code, message, errors = [], stackTrace = null) => ({
  error: {
    code,
    message,
    errors,
    stackTrace,
  },
});

/**
 * This function will wrap callbacks into an
 * @param callback
 */
const async = function f(callback) {
  if (!callback) {
    return () => {};
  }

  return (req, res, next) => {
    const prms = new Promise((resolve, reject) => {
      try {
        resolve(callback(req, res, next));
      } catch (err) {
        reject(err);
      }
    });

    prms.catch((err) => {
      let code = 500;
      let errors = [];

      if (err instanceof AuthenticationRequiredError) {
        code = 401;
      }

      if (err instanceof JoiValidationError) {
        code = 400;
        errors = err.details;
      }

      res.status(code)
        .json(errorObject(code, err.message, errors));
    });

    return prms;
  };
};

export { async, errorObject };
export default { async, errorObject };
