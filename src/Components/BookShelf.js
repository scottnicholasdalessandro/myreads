import React, {Component} from 'react';
import Book from './Book';

class BookShelf extends Component {
  render() {
    let books = this.props.books;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books &&
              books.map((book, index) => {
                return (
                  <li key={book && book.id ? book.id : index}>
                    {' '}
                    <Book changeShelf={this.props.changeShelf} book={book} />{' '}
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
