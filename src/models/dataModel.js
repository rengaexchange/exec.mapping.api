const db = require("../../config/database");
const config = require("../../config/config");

module.exports = async function(result) {

    var Rawdata = db.sequelize.define(config.config.MAPPING_CSV_IMPORT_TABLE, {
        exc_prod_id: db.Sequelize.STRING,
        item_number: db.Sequelize.STRING,
        style: db.Sequelize.STRING,
        parent_id: db.Sequelize.STRING,
        color: db.Sequelize.STRING,
        brand: db.Sequelize.STRING,
        product_name: db.Sequelize.STRING,
        upc: db.Sequelize.BIGINT,
        images: db.Sequelize.STRING,
        category: db.Sequelize.STRING,
        retail_price: db.Sequelize.STRING,
        wholesale: db.Sequelize.STRING,
        description: db.Sequelize.STRING,
        gender: db.Sequelize.STRING,
        specs: db.Sequelize.STRING,
        brand_id: db.Sequelize.STRING
    })

    db.sequelize.sync({
        force: false
    })
    .then(function(){
        result.forEach(chunk => {
            Rawdata.create({
                exc_prod_id : chunk.exc_prod_id,
                item_number : chunk.item_number,
                style : chunk.style,
                parent_id : chunk.parent_id,
                color : chunk.color,
                brand : chunk.brand,
                product_name : chunk.product_name,
                upc : chunk.upc,
                images : chunk.images,
                category : chunk.category,
                retail_price : chunk.retail_price,
                wholesale : chunk.wholesale,
                description : chunk.description,
                gender : chunk.gender,
                specs : chunk.specs,
                brand_id : chunk.brand_id,
            })
        });
    })
}