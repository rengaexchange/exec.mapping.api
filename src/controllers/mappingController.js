const parse = require('../services/mappingService').parse;
const crypto = require('crypto');
const csv = require("csv-parser");
const fs = require("fs")

function  postData (req, res) {

};

function  getData (req, res, cb) {
  let nData =[];
   fs.createReadStream('raw.csv')
     .pipe(csv())
     .on('data', (data) => nData.push(data))
     .on('end', () => {
            let result = parse(nData);
            console.log(result);
      });
};

function deleteData (req, res) {

};


function updateData (req, res) {

};

module.exports.postData=postData;
module.exports.getData=getData;
module.exports.deleteData=deleteData;
module.exports.updateData=updateData;


