import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  handleChange = event => {
    this.props.changeShelf(this.props.book, event.target.value);
  };
  render() {
    const book = this.props.book;    

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: 'url(' + (book && book.imageLinks ? book.imageLinks.thumbnail : '') + ')'
              }}
            />
            <div className="book-shelf-changer">
              <select value={book && book.shelf} onChange={this.handleChange}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div className="book-title">{book && book.title ? book.title : 'PENDING'}</div>
          <div className="book-authors">{book && book.authors ? book.authors[0] : 'Author Unknown'}</div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  changeShelf: PropTypes.func,
  books: PropTypes.array
};

export default Book;
