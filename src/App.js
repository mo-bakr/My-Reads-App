import React from 'react';
// import * as BooksAPI from './BooksAPI'
import * as BooksAPI from './BooksAPI';
import './App.css';
import { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import BookSearch from './comps/BookSearch';
import BookShelf from './comps/BookShelf';
import Title from './comps/Header';



function MyBooksApp() {
  let [books, setbooks] = useState([]);
  let [flip, setflip] = useState(true);

  useEffect(function () {

    BooksAPI.getAll().then(function (books) {
      setbooks(books);

    });
  },
    []);

  // using magic to update the book shelf in local state
  // after that use more magic to update in the API used by BookShelfList comp 
  function updateShelf(book, shelf) {

    // search for book index to determine if it's on one of the  shelfs
    const updateIndex = books.findIndex(function (bookIndex) {
      return bookIndex.id === book.id;
    });
    const updateingBooksList = books;

    // No index = Book is not currently on a shelf
    if (updateIndex < 0) {
      book.shelf = shelf;
      updateingBooksList.push(book);
    }

    // index found = update the shelfs and the current state
    else {
      updateingBooksList[updateIndex].shelf = shelf;
    }
    setbooks(updateingBooksList);

    BooksAPI.update(book, shelf);
    setflip(!flip);
  }

  return (
    <div className="app">

      <Route path="/search" render={function () {
        return (
          <BookSearch storedBooks={books} onUpdateShelf={updateShelf} />
        );
      }} />

      <Route exact path="/" render={function () {
        return (
          <div className="list-books">
            <Title />
            <div className="list-books-content">

              <div>
                <BookShelf
                  className="bookshelf"
                  title="Currently Reading"
                  books={books.filter(function (book) {
                    return book.shelf === "currentlyReading";
                  })}
                  updateShelf={updateShelf} />

                <BookShelf
                  className="bookshelf"
                  title="Want to Read"
                  books={books.filter(function (book) {
                    return book.shelf === "wantToRead";
                  })}
                  updateShelf={updateShelf} />

                <BookShelf
                  className="bookshelf"
                  title="Read"
                  books={books.filter(function (book) {
                    return book.shelf === "read";
                  })}
                  updateShelf={updateShelf} />

              </div>

            </div>

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>

          </div>
        );
      }} />
    </div>
  )
}

export default MyBooksApp;
