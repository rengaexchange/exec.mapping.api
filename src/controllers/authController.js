const jwt = require('jsonwebtoken');
require("dotenv").config();

function postData (req, res) {
   const uname = req.body.username;
   const user = { name : uname};
   const token = generateAcessToken(user);
   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
   return res.json({
       token :token, 
       refreshToken : refreshToken
      });
}

//Token expires in 30 mins
function generateAcessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
}

function getData(req, res) {
  res.json(req.user);
}

module.exports.postData = postData;
module.exports.getData = getData;
module.exports.generateAcessToken= generateAcessToken;