var mongoose = require('mongoose');

var LibrarySchema = new mongoose.Schema({
    "Author_name" : { type: String },
    "Author_id" : { type: String},
    "year" : { type: String},
    "Book_name" : {type: String}
});

module.exports = mongoose.model('Library', LibrarySchema);
