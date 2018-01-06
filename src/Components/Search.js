import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {search as searchAPI} from '../BooksAPI';
import Book from './Book';

class Search extends Component {
  state = {
    searchResults: [],
    query: ''
  };

  search = event => {
    let query = event.target.value.trim();

    if (query) {
      searchAPI(query)
        .then(searchResults => {
          let onShelf = this.props.books;
          let filteredResults = searchResults.map(book => {
            onShelf.forEach(shelfBook => {
              if (book.id === shelfBook.id) {
                book.shelf = shelfBook.shelf;
              }
            });
            return book;
          });

          this.setState({searchResults: filteredResults});
        })
        .catch(error => {
          alert(`no results for your query "${query}"`);
        });
    } else this.setState({searchResults: []});
  };

  render() {
    let searchResults = this.state.searchResults;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a href="/" className="close-search">
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.search} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.length > 0 &&
              searchResults.map(result => {
                return (
                  <Book
                    key={result && result.id ? result.id : undefined}
                    changeShelf={this.props.changeShelf}
                    book={result}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  changeShelf: PropTypes.func,
  books: PropTypes.array
};

export default Search;
