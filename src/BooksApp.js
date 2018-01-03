import React from 'react';
import Route from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Components/Book';
import BookShelf from './Components/BookShelf';
import {Link} from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    bookShelfStatus: {}
  };
  changeShelf = (book, newShelf) => {
    this.setState(prevState => {
      // 1) Remove the book from the current shelf
      // 2) Add the book to the new Shelf

      const oldShelf = book['shelf'];
      book.shelf = newShelf;

      return {
        bookShelfStatus: {
          ...prevState.bookShelfStatus,
          [oldShelf]: prevState.bookShelfStatus[oldShelf].filter(currentBook => book.id !== currentBook.id),
          [newShelf]: prevState.bookShelfStatus[newShelf].concat([book])
        }
      };
    });

    BooksAPI.update(book, newShelf);
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let bookShelfStatus = {};
      books.forEach(book => {
        bookShelfStatus[book['shelf']]
          ? bookShelfStatus[book['shelf']].push(book)
          : (bookShelfStatus[book['shelf']] = [book]);
      });
      this.setState({bookShelfStatus});
    });
  }

  render() {
    let bookShelfStatus = this.state.bookShelfStatus;
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {bookShelfStatus && (
              <div>
                <BookShelf
                  name={'Currently Reading'}
                  changeShelf={this.changeShelf}
                  books={bookShelfStatus['currentlyReading']}
                />
                <BookShelf name={'Want to Read'} changeShelf={this.changeShelf} books={bookShelfStatus['wantToRead']} />
                <BookShelf name={'Read'} changeShelf={this.changeShelf} books={bookShelfStatus['read']} />
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
}

export default BooksApp;
