import { helpers } from 'common-errors';

const JoiValidationError = helpers.generateClass('JoiValidationError');
const RandNumGeneratorError = helpers.generateClass('RandNumGeneratorError');

const QuoteAlreadyConfirmedError = helpers.generateClass('QuoteAlreadyConfirmedError');
const InvalidQuoteError = helpers.generateClass('InvalidQuoteError');

const DocuSignInvalidToken = helpers.generateClass('DocuSignInvalidToken');
const DocuSignUserInfoError = helpers.generateClass('DocuSignUserInfoError');
const DocuSignEmbeddedLinkError = helpers.generateClass('DocuSignEmbeddedLinkError');

export {
  JoiValidationError,
  RandNumGeneratorError,
  QuoteAlreadyConfirmedError,
  InvalidQuoteError,
  DocuSignInvalidToken,
  DocuSignEmbeddedLinkError,
  DocuSignUserInfoError,
};
export default {
  JoiValidationError,
  RandNumGeneratorError,
  QuoteAlreadyConfirmedError,
  InvalidQuoteError,
  DocuSignInvalidToken,
  DocuSignUserInfoError,
  DocuSignEmbeddedLinkError,
};
