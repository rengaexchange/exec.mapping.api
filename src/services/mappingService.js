const db = require("../../config/database")
const dataModel = require("../models/dataModel");
const { QueryTypes } = require('sequelize');
const { any } = require("joi");

const brandIds = [
    {
        "name": "Billabong",
        "id" : 1622
    },
    {
        "name" :"SPY Optic",
         "id": 1615
    }
];

  function parse (data) {

    let arr = [];
    data.forEach(chunk => {
        let o = {};
        let bId  = getBrandId(chunk.brand);
        getCategory(bId, chunk.category).then( a=>
            o.category = (a) ? a : '');
        o.exc_prod_id = chunk.brand + '-' + chunk.product_id;
        o.item_number = chunk.product_id;
        o.style = chunk.parent_id.split("-")[0];
        o.parent_id = chunk.brand + "-" + chunk.parent_id;
        o.color = chunk.Color;
        o.brand = chunk.brand;
        o.product_name = chunk.product_name;
        o.upc = chunk.upc;
        o.images = chunk.images;
        o.retail_price = chunk.retail_price;
        o.wholesale = chunk.Wholesale;
        o.description = chunk.Description;
        o.gender = (chunk.gender) ? chunk.gender : "";
        o.specs = chunk.specs;
        o.brand_id = (bId) ? bId : '';
        arr.push(o);
    });
    dataModel(arr)
    return arr;
}

function getBrandId(brand) {
    let ids =[];
    brandIds.forEach(function(item) {
          if(item.name === brand) {
              ids.push(item.id);
          }
     });

     return ids[0];
}

async function getAllCategory(brand_id, category){
   let sql = "SELECT mapping.input AS iCategory, " +
                     "category.name AS oCategory, " +
                     "mapping_type.id AS mapping_type_id, " +
                     "mapping.brand_id FROM mapping " +
             "LEFT JOIN category ON category.id = mapping.category_id " +
             "LEFT JOIN mapping_type ON mapping.mapping_type_id = mapping_type.id  where  mapping.brand_id = " + brand_id +
             " AND mapping.input =\""+category+"\"";
    const fcategory = await db.sequelize.query( sql, {
                type: QueryTypes.SELECT
            });
    
    return fcategory;
}


 async function getCategory(brand_id, category) {
    let cat = await getAllCategory(brand_id, category);
    if(cat.length >=1){
        return cat[0].oCategory;
    }
}

async function get(){
    const records = await db.sequelize.query('select * from `rawDataFromBrands` limit 1000', {
        type: QueryTypes.SELECT
      });
      return records;
}

module.exports = {
    parse,
    get
}
