const { Sequelize } = require('sequelize');
const db = require("../../config/database")
module.exports = async function(result) {
    var sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
        host: db.HOST,
        dialect: "mysql",
        pool: {
            idle: 200000,
            acquire: 1000000
        }
    })

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    var Rawdata = sequelize.define('rawDataFromBrands', {
        exc_prod_id: Sequelize.STRING,
        item_number: Sequelize.STRING,
        style: Sequelize.STRING,
        parent_id: Sequelize.STRING,
        color: Sequelize.STRING,
        brand: Sequelize.STRING,
        product_name: Sequelize.STRING,
        upc: Sequelize.BIGINT,
        images: Sequelize.STRING,
        category: Sequelize.STRING,
        retail_price: Sequelize.STRING,
        wholesale: Sequelize.STRING,
        description: Sequelize.STRING,
        gender: Sequelize.STRING,
        specs: Sequelize.STRING,
        brand_id: Sequelize.STRING
    })

    sequelize.sync({
        force: true
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