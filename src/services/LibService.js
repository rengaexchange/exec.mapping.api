const request = require('request');
const config = require('../../config/config');
const Book = require("../models/lib");
var uuid = require("uuid");

function bookData(body) {

    const bookData = new Book(body);
    bookData.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully created an bookData.");
            return true;
        }
    });

};


async function getBookData(){

    const obj =[];

    await new Promise(function(resolve, reject) {

        Book.find().exec(function(err, items) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
               // console.log(items);
                obj.push(items);
                resolve(items);
            }
        });
    });

    return obj;
}



function deleteData(id) {

    Book.deleteOne({ Author_id: id }, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully delete from bookData.");
            return true;
        }
    });

};



function updateData(data) {

    Book.upsert = function (id, data, callBack) {
        this.findById({ Author_id: data.id }, function (err, oldData) {
            if(err) {
                callBack(err);
            } else {
                updateData(data, oldData).save(callBack);
            }
        });
    };

};


module.exports.bookData = bookData;
module.exports.getBookData = getBookData;
module.exports.deleteData = deleteData;
module.exports.updateData = updateData;
