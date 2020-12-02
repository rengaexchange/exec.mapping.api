const crypto = require('crypto');
const csv = require("csv-parser");
const fs = require("fs");
const brandData = require('../services/brandingService').get;

async function getData (req, res, cb) {
    let brand = req.query.brand;
    let limit = req.query.limit;
    console.log("limit" + limit);
    const data = await brandData(brand, limit);
    res.json(data);
  };

  module.exports.getData=getData;