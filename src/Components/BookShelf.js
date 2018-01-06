import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function BookShelf(props) {
  const {books, shelf, name, changeShelf} = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.filter((book, index) => book.shelf === shelf).map((book, index) => {
              return <Book key={book && book.id ? book.id : index} changeShelf={changeShelf} book={book} />;
            })}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  changeShelf: PropTypes.func,
  books: PropTypes.array,
  name: PropTypes.string
};

export default BookShelf;
