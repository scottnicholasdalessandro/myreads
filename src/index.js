import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BooksApp from './BooksApp';
import Search from './Components/Search';
import './index.css';

const Root = () => {
  return (
    <Router> 
    <div>
      <Route path="/search" component={Search} />     
      <Route exact path="/" component={BooksApp}/>
    </div>
    </Router>
  );
};


ReactDOM.render(<Root />, document.getElementById('root'));
