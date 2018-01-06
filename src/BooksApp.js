import React from 'react';
import * as BooksAPI from './BooksAPI';
import BookList from './Components/BookList';
import Search from './Components/Search';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  changeShelf = (bookToChange, newShelf) => {
    bookToChange.shelf = newShelf;
    this.setState(prevState => {
      const books = prevState.books.map(book => {
        if (bookToChange.id === book.id) return bookToChange;
        return book;
      });
      return {books};
    });

    BooksAPI.update(bookToChange, newShelf);
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    });
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <BookList books={this.state.books} changeShelf={this.changeShelf} />} />
            <Route
              path="/search"
              render={() => <Search books={this.state.books} changeShelf={this.changeShelf} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
