const crypto = require('crypto');
const csv = require("csv-parser");
const fs = require("fs");
const brandData = require('../services/brandingService');

async function getData (req, res, cb) {
    let brand = req.query.brand;
    let limit = req.query.limit;
    const data = await brandData.get(brand, limit);
    res.json(data);
  };


  async function delData (req, res, cb) {
    let brand = req.query.brand;
    const data = await brandData.deleteBrand(brand);
    res.json(data);
  };

  module.exports={
      getData,
      delData
  }