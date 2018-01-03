import React, {Component} from 'react';
import {search} from '../BooksAPI';
import Book from './Book';

class Search extends Component {
  state = {
    searchResults: []
  };

  search = event => {
    let query = event.target.value;
    query && search(query).then(searchResults => {
      this.setState({searchResults});
    });
  };

  render() {
    console.log(this.props);
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
            {searchResults && searchResults.map(result => {
             return (<li key={result && result.id ? result.id : undefined}>
                {' '}
                <Book changeShelf={this.props.changeShelf}book={result} />{' '}
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
