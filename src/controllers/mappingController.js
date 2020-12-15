const mappingService = require('../services/mappingService');
const crypto = require('crypto');
const csv = require("csv-parser");
const fs = require("fs");

function postData (req, res) {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let sampleFile = req.files.file;
  sampleFile.mv('./csvfiles/'+sampleFile.name, function(err) {
    if (err) {
      return res.status(500).send(err);
    }else {
      let nData =[];
       fs.createReadStream('./csvfiles/'+sampleFile.name)
        .pipe(csv())
        .on('data', (data) => nData.push(data))
        .on('end', () => {
              let result =  mappingService.parse(nData);
              res.send(result)
        });
    }
      
   });

};

async function getData (req, res, cb) {
  const data = await mappingService.get();
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


