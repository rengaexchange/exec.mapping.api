const db = require("../../config/database")
const dataModel = require("../models/dataModel");
const { QueryTypes } = require('sequelize');
const { any } = require("joi");

  function parse (data) {

    let arr = [];
    data.forEach(chunk => {
        let o = {};
        getBrandId(chunk.brand).then( b => 
            o.brand_id = (b) ? b : 0 );
        getCategory(chunk.category, chunk.brand).then( a=>
            o.category = (a) ? a : '');
        getStatus(chunk.category, chunk.brand).then( a=>
                o.status = (a) ? 'true' : 'false');
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
        arr.push(o);
    });
    dataModel(arr)
    return arr;
}

async function getBrandId(brand) {
    let oBrand = await getBrands(brand);
     return oBrand[0].id;
}

async function getAllCategory(brand_id, category){
   let sql = "SELECT mapping.input AS iCategory, " +
                     "mapping_category.name AS oCategory, " +
                     "mapping_type.id AS mapping_type_id, " +
                     "mapping.brand_id FROM mapping " +
             "LEFT JOIN mapping_category ON mapping_category.id = mapping.category_id " +
             "LEFT JOIN mapping_type ON mapping.mapping_type_id = mapping_type.id  where  mapping.brand_id = " + brand_id +
             " AND mapping.input =\""+category+"\"";
    const fcategory = await db.sequelize.query( sql, {
                type: QueryTypes.SELECT
            });
    
    return fcategory;
}

async function getBrands(brand){
    return new Promise(async (resolve, reject) => {
        try {
          let sql = "SELECT brand_id as id " + 
                            "FROM mapping_brands where input_brand_name =\""+ brand +"\"";
          const fbrands = await db.sequelize.query(sql, {
                            type: QueryTypes.SELECT
                        });
            resolve(fbrands);
        } catch (e) {
            reject(e);
        }
      })
 }

 async function getStatus(category, brand) {
    let oBrand = await getBrands(brand);
    let cat = await getAllCategory(oBrand[0].id, category);
    if(cat.length >=1){
        return cat[0].oCategory;
    }
}

 async function getCategory(category, brand) {
    let oBrand = await getBrands(brand);
    let cat = await getAllCategory(oBrand[0].id, category);
    if(cat.length >=1){
        return cat[0].oCategory;
    }
}

async function get(){
    const records = await db.sequelize.query('select * from `rawDataFromBrands`', {
        type: QueryTypes.SELECT
      });
      return records;
}

module.exports = {
    parse,
    get
}
