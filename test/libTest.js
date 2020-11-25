const assert = require('assert');
const Book = require('../src/models/lib');
let lib;


describe('Creating documents', () => {
    it('creates a book', (done) => {
        const book = new Book(
            {
                "Author_name": "John",
                "Author_id": 1,
                "year": 2020,
                "Book_name": "chemistry"
            }
            );
        book.save()
            .then(() => {
                assert(!book.isNew); //if poke is saved to db it is not new
                done();
            });
    });
});


describe('Reading books details', () => {

    beforeEach(() => {
        lib = new Pokemon({  Author_name: 'John' });
        lib.save()
            .then(() => done());
    });


    it('finds books with the name of lib', (done) => {
        Book.findOne({ name: 'John' })
            .then((Book) => {
                assert(Book.Author_name === 'John');
                done();
            });
    })
});




describe('Deleting a book', () => {

    beforeEach(() => {
        lib = new Pokemon({  Author_name: 'John' });
        lib.save()
            .then(() => done());
    });


    it('removes books with the name of lib', (done) => {

        Book.remove()
            .then(() => Book.findOne({ name: 'poke' }))
            .then((book) => {
                assert(book === null);
                done();
            });
    });

    beforeEach((done), () => {
        poke = new Pokemon({ name: 'poke' });
        poke.save()
            .then(() => done());
    });

});
