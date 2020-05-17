import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuize from './AuthorQuize';
import * as serviceWorker from './serviceWorker';

const authors = [
  {
    name: "Mar Twain",
    imageUrl: "/images/authors/marktwain.jpg",
    imageSource: "Wikimedia Commons",
    books: ['The Adventures of Huckleberry Finn']
  }
]

const state = {
  turnData: {
    author: authors[0],
    books: author[0].books
  }
}

ReactDOM.render(
  <React.StrictMode>
    <AuthorQuize />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
