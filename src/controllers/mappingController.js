const LibService = require('../services/LibService');
const crypto = require('crypto');

function  postBookData (req, res) {

    console.log(req.body);
    const data = req.body;

    try {
        const getAvailabilityDataLists = LibService.bookData(data);

        return res.send(getAvailabilityDataLists);

    }catch (e) {
        console.log(e);
    }
};

async function  getBookList (req, res, cb) {

    let books =[];

    const getBooks = await LibService.getBookData();

    //console.log(getBooks);

    getBooks.forEach(function (book) {
        book.forEach(function (data) {
           books.push(data.Book_name);
        })

    });

    console.log(books);


    return res.send(books.join(","));

};


function deleteBook (req, res) {

    console.log(req.params.id);
    const data = req.params.id;

    try {
        const getAvailabilityDataLists = LibService.deleteData(data);

        return res.send(getAvailabilityDataLists);

    }catch (e) {
        console.log(e);
    }
};


function updateBook (req, res) {

    const data = req.body;

    try {
        const getAvailabilityDataLists = LibService.updateData(data);

        return res.send(getAvailabilityDataLists);

    }catch (e) {
        console.log(e);
    }
};



module.exports.postBookData = postBookData;
module.exports.getBookList=getBookList;
module.exports.deleteBook= deleteBook;
module.exports.updateBook= updateBook;


