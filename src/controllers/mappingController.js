const parse = require('../services/mappingService').parse;
const csvData = require('../services/mappingService').get;
const crypto = require('crypto');
const csv = require("csv-parser");
const fs = require("fs");

function  postData (req, res) {
  let nData =[];
  fs.createReadStream('./csvfiles/raw.csv')
    .pipe(csv())
    .on('data', (data) => nData.push(data))
    .on('end', () => {
          let result = parse(nData);
          res.send(result)
    });
};

async function getData (req, res, cb) {
  const data = await csvData();
  res.json(data);
};

function deleteData (req, res) {

};


function updateData (req, res) {

};

module.exports.postData=postData;
module.exports.getData=getData;
module.exports.deleteData=deleteData;
module.exports.updateData=updateData;


