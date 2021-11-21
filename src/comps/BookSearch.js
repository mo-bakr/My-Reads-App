import React from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Book from "./Book";
import propTypes from "prop-types";

function BookSearch(props) {

    BookSearch.propTypes = {

        storedBooks: propTypes.array.isRequired,
        onUpdateShelf: propTypes.func.isRequired

    };

    // set state of the search
    let [userInput, setuserInput] = useState("");

    // set state of the searched books after user input
    let [searchedBooks, setsearchedBooks] = useState([]);

    // use the user input to find the books 
    function updateuserInput(userInput) {

        setuserInput(userInput);

        // using the API to search for the books
        BooksAPI.search(userInput).then(function (input) {

            if (input && input.length > 0) {

                for (let i = 0; i < input.length; i++) {

                    for (let j = 0; j < props.storedBooks.length; j++) {

                        if (input[i].id === props.storedBooks[j].id) {
                            const shelfedBookIndex = props.storedBooks.findIndex(function (book) {
                                return book.id === input[i].id;
                            });

                            input[i].shelf = props.storedBooks[shelfedBookIndex].shelf;
                        }
                    }
                }
            }
            setsearchedBooks(input);
        });
    }

    return (
        <div className="search-books">

            <div className="search-books-bar">

                <Link className="close-search" to="/">Close</Link>

                <div className="search-books-input-wrapper">

                    <input type="text"
                        value={userInput}
                        placeholder="Search by title or author"
                        onChange={function (event) {
                            return updateuserInput(event.target.value);
                        }} />

                </div>

            </div>

            <div className="search-books-results">

                <ol className="books-grid">

                    {searchedBooks && searchedBooks.length > 0 && searchedBooks.map(function (book) {
                        return (
                            <Book key={book.id} onUpdateShelf={props.onUpdateShelf} bookItem={book} />
                        );
                    })}

                </ol>

            </div>

        </div>
    )
}
export default BookSearch