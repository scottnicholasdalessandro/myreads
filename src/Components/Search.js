import React, {Component} from 'react';
import {search} from '../BooksAPI';
import Book from './Book';
import {flatten} from '../utlility';

class Search extends Component {
  state = {
    searchResults: [],
    query: ''
  };

  search = event => {
    let query = event.target.value.trim();

    if (query) {
      search(query).then(searchResults => {
        let onShelf = flatten(this.props.bookShelfStatus);

        let filteredResults = searchResults.map(book => {
          onShelf.forEach(shelfBook => {
            if (book.id === shelfBook.id) {
              book.shelf = shelfBook.shelf;
            }
          });
          return book;
        });

        this.setState({searchResults: filteredResults});
      });
    } else this.setState({searchResults: []});
  };

  render() {
    let searchResults = this.state.searchResults;
    console.log('RESULTS', searchResults);
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
            {searchResults &&
              searchResults.map(result => {
                return (
                  <li key={result && result.id ? result.id : undefined}>
                    {' '}
                    <Book changeShelf={this.props.changeShelf} book={result} />{' '}
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
