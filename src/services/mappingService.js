/*{
        "product_id": "ABBBS00126-BLK-22",
        "parent_id": "ABBBS00126-BLK",
        "brand": "Billabong",
        "product_name": "GRINCH ALOHA MINI LT",
        "upc": "194843453250",
        "Wholesale": "$24.95",
        "retail_price": "$49.95",
        "images": "https://images.boardriders.com/elasticSuite/billabong/large/abbbs00126_blk.primary.png",
        "category": "Apparel>Youth>Boardshorts/Jams",
        "Color": "Black",
        "Size": "22",
        "Description": "Boardshort - GRINCH ALOHA MINI LT",
        "Material": "",
        "specs": ""
    }*/

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

    return arr;
}

module.exports.parse=parse;