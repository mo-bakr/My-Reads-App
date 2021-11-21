import React from 'react';
import Book from './Book.js';
import propTypes from 'prop-types';

function BookShelf(props) {

    BookShelf.propTypes = {

        books: propTypes.array.isRequired,
        title: propTypes.string.isRequired,
        updateShelf: propTypes.func.isRequired

    }

    return (
        <div className="bookshelf">

            <h2 className="bookshelf-title"> {props.title} </h2>

            <div className="bookshelf-books">

                <ol className="books-grid">

                    {props.books.map(function (book) {

                        return <Book key={book.id} onUpdateShelf={props.updateShelf} bookItem={book} />

                    })}

                </ol>

            </div>

        </div>
    )

}
export default BookShelf