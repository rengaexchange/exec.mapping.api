import JWT from 'jsonwebtoken';
import _ from 'lodash';
import config from 'config';
import { AuthenticationRequiredError } from 'common-errors';
import { async } from '../core/ErrorHandler';
import log from '../core/Logger';

const auth = async(async (req, res, next) => {
  const error = new AuthenticationRequiredError('Invalid JWT token');
  const bearer = _.get(req, 'headers.authorization', '');
  const parts = bearer.match(/bearer\s*(.*)/i);
  const token = _.get(parts, '[1]');

  if (!token) {
    log.error(`Can't retrieved token from: ${bearer}`);
    throw error;
  }

  log.info('JWT token received: ', token);

  let info;
  try {
    info = await JWT.verify(
      token,
      config.jwt.RSA.public,
      { algorithm: 'RS256' },
    );
  } catch (e) {
    log.error(e);
    throw error;
  }

  log.info('Retrieved token info: ', info);

  req.user = {
    id: userId,
  };

  next();
});

export { auth };
export default { auth };
