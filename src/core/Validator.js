import Joi from 'joi';
import { JoiValidationError } from '../errors';

const validate = (data, schema = {}, options = { abortEarly: false }) => {
  const { error } = Joi.validate(data, schema, options);
  if (!error) {
    return;
  }

  const instance = new JoiValidationError(error.message);
  instance.details = error.details;
  throw instance;
};

export { validate };
export default { validate };
