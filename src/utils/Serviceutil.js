
function asyncMiddleware(req, res, next) {
  Promise.resolve(req, res, next).catch((err) => {
    res.status(500).send({ error: err.message });
  });
}


module.exports.asyncMiddleware = asyncMiddleware;
