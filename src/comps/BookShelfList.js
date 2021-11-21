import React from 'react';
import propTypes from 'prop-types';

function BookShelfList(props) {

    BookShelfList.propTypes = {

        bookItem: propTypes.object.isRequired,
        onUpdateShelf: propTypes.func.isRequired

    };

    return (
        <div className="book-shelf-changer">

            <select onChange={function (event) {

                return props.onUpdateShelf(props.bookItem, event.target.value);

            }}
                value={(props.bookItem.shelf ? props.bookItem.shelf : "none")}>

                <option value="move" disabled>Move to [ select Shelf ]</option>
                <option value="currentlyReading">Currently Reading Shelf</option>
                <option value="wantToRead">Want to Read Shelf</option>
                <option value="read">Read Shelf</option>
                <option value="none">Take Off Shelf</option>

            </select>

        </div>
    )

}
export default BookShelfList