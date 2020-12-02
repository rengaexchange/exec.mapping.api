const crypto = require('crypto');
const csv = require("csv-parser");
const fs = require("fs");
const brandData = require('../services/brandingService').get;

async function getData (req, res, cb) {
    let brand = req.query.brand;
    const data = await brandData(brand);
    res.json(data);
  };

  module.exports.getData=getData;