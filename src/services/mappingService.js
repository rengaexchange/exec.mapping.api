const db = require("../../config/database")
const dataModel = require("../models/dataModel");

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

module.exports.parse=parse;