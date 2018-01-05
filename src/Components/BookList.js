import React, {Component} from 'react';
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom';

class BookList extends Component {
  render() {
    let bookShelfStatus = this.props.bookShelfStatus;
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {bookShelfStatus && (
              <div>
                <BookShelf
                  name={'Currently Reading'}
                  changeShelf={this.props.changeShelf}
                  books={bookShelfStatus['currentlyReading']}
                />
                <BookShelf name={'Want to Read'} changeShelf={this.props.changeShelf} books={bookShelfStatus['wantToRead']} />
                <BookShelf name={'Read'} changeShelf={this.props.changeShelf} books={bookShelfStatus['read']} />
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

export default BookList;
