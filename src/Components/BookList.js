import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom';

function BookList(props) {
  const {books, changeShelf} = props;

  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {books && (
            <div>
              <BookShelf
                name={'Currently Reading'}
                changeShelf={changeShelf}
                books={books}
                shelf={'currentlyReading'}
              />
              <BookShelf name={'Want to Read'} changeShelf={changeShelf} books={books} shelf={'wantToRead'} />
              <BookShelf name={'Read'} changeShelf={changeShelf} books={books} shelf={'read'} />
            </div>
          )}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

BookList.propTypes = {
  changeShelf: PropTypes.func,
  books: PropTypes.array
};

export default BookList;
