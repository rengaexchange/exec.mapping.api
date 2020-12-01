const db = require("../../config/database")
const dataModel = require("../models/dataModel");
const { QueryTypes, Sequelize } = require('sequelize');
var sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: "mysql",
    pool: {
        idle: 200000,
        acquire: 1000000
    }
})


function parse (data) {
    let arr = [];
    data.forEach(chunk => {
        let o = {};
        o.exc_prod_id = chunk.brand + '-' + chunk.product_id;
        o.item_number = chunk.product_id;
        o.style = chunk.parent_id.split("-")[0];
        o.parent_id = chunk.brand + "-" + chunk.parent_id;
        o.color = chunk.Color;
        o.brand = chunk.brand;
        o.product_name = chunk.product_name;
        o.upc = chunk.upc;
        o.images = chunk.images;
        o.category = chunk.category;
        o.retail_price = chunk.retail_price;
        o.wholesale = chunk.Wholesale;
        o.description = chunk.Description;
        o.gender = (chunk.gender) ? chunk.gender : "";
        o.specs = chunk.specs;
        o.brand_id = (chunk.brand_id) ? chunk.brand_id : "";
        arr.push(o);
    });
    dataModel(arr)
    return arr;
}

async function get(){
    const records = await sequelize.query('select * from `rawDataFromBrands`', {
        type: QueryTypes.SELECT
      });
      return records;
}

module.exports.parse=parse;
module.exports.get=get;