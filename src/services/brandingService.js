const db = require("../../config/database");
const { QueryTypes } = require('sequelize');

async function get(brandName,limit){
   console.log("brand name"+ brandName);
   let condition;
    
    if( limit == 0 || limit =='') {
      condition = ' where brand like "%'+brandName+'%"';
    } else {
      condition = ' where brand like "%'+brandName+'%" limit '+limit;
    }
    let sql = 'select * from `rawDataFromBrands`'+ condition;
    console.log("sql "+ sql);
    const records = await db.sequelize.query( sql, {
      type: QueryTypes.SELECT
    });
    return records;
}


async function deleteBrand(brandName){
  console.log("brand name"+ brandName);
  let condition;

  condition = ' where brand like "%'+brandName+'%"';
  
   let sql = 'delete from `rawDataFromBrands`'+ condition;
   console.log("sql "+ sql);
   const records = await db.sequelize.query( sql, {
     type: QueryTypes.DELETE
   });
   return records;
}

module.exports={
  get,
  deleteBrand
}