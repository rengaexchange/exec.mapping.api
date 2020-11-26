const jwt = require('jsonwebtoken');
require("dotenv").config();

function postData (req, res) {
   const uname = req.body.username;
   const user = { name : uname};
   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
   return res.json({"token":token});
}

function getData(req, res) {
  res.json(req.user);
}

module.exports.postData = postData;
module.exports.getData = getData;