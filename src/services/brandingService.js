const db = require("../../config/database");
const { QueryTypes } = require('sequelize');

async function get(brandName){
   console.log("brand name"+ brandName);
    let condition = ' where brand like "%'+brandName+'%"';
    let sql = 'select * from `rawDataFromBrands`'+ condition;
    console.log("sql "+ sql);
    const records = await db.sequelize.query( sql, {
      type: QueryTypes.SELECT
    });
    return records;
}

module.exports.get=get;