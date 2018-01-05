import React from 'react';
import * as BooksAPI from './BooksAPI';
import BookList from './Components/BookList';
import Search from './Components/Search';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

// BooksAPI.update(book,shelf).then(() => {
//   book.shelf = shelf;
//   this.setState(state => ({
//     books: state.books.filter(b => b.id !== book.id).concat([ book ])
//   }))
// })



class BooksApp extends React.Component {
  state = {
    bookShelfStatus: {}
  };

  // may be able to refactor changeShelf, might be over complicated....
  changeShelf = (book, newShelf) => {
    this.setState(prevState => {
      const oldShelf = book['shelf'] || 'none';
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
      let bookShelfStatus = {none:[]};
      books.forEach(book => {
        bookShelfStatus[book['shelf']]
          ? bookShelfStatus[book['shelf']].push(book)
          : (bookShelfStatus[book['shelf']] = [book]);
      });
      this.setState({bookShelfStatus});
    });
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <BookList bookShelfStatus={this.state.bookShelfStatus} changeShelf={this.changeShelf} />}
            />
            <Route path="/search" render={() => <Search bookShelfStatus={this.state.bookShelfStatus} changeShelf={this.changeShelf} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
