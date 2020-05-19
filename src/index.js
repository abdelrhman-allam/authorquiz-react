import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm'
import * as serviceWorker from './serviceWorker';
// inmport shuffle from 'underscore';

const authors = [
  {
    name: "MarK Twain",
    imageUrl: "/images/authors/marktwain.jpg",
    imageSource: "Wikimedia Commons",
    books: [
      'The Adventures of Huckleberry Finn',
    ]
  },
  {
    name: "J.K. Rowling",
    imageUrl: "/images/authors/jkrowling.jpg",
    imageSource: "Wikimedia Commons",
    books: [
      'Harray Potter and the Goblet of Fire',
      'Harray Potter and the Champer of Secrets',
    ]
  },
  {
    name: "William Shakspeare",
    imageUrl: "/images/authors/williamshakespeare.jpg",
    imageSource: "Wikimedia Commons",
    books: [
      'Hamlet', 'Macbeth', 'Romeo and Juliet'
    ]
  },
  {
    name: "Joseph Conrad",
    imageUrl: "/images/authors/josephconrad.jpg",
    imageSource: "Wikimedia Commons",
    books: [
      'Heart of Darkness'
    ]
  }
];


function getTrunData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);

  allBooks.forEach((a, i, all) => {
    const r = Math.floor((Math.random() * (all.length - i)) + i);
    allBooks[i] = allBooks[r];
    allBooks[r] = a;
  });

  const fourRandomBooks = allBooks.slice(0, 4);

  const answer = fourRandomBooks[Math.floor(Math.random() * fourRandomBooks.length)];
  const author = authors.find((qAuthor) =>
    qAuthor.books.some((title) => title == answer)
  );

  return {
    books: fourRandomBooks,
    author: author,
    answer: answer
  }
}



function reducer(state = { authors, turnData: getTrunData(authors), highlight: '' }, action) {

  switch (action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
      return Object.assign({}, state,
        { highlight: isCorrect ? 'correct' : 'wrong' }
      );
    case 'CONTINUE':
      return Object.assign({}, state,
        {
          highlight: '', turnData: getTrunData(state.authors)
        });
    case 'ADD_AUTHOR':
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author])
      });

    default:
      return state;
  }
}

let store = Redux.createStore(reducer);

ReactDOM.render(
  <Router>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={AuthorQuiz} />
        <Route path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </Router>
  , document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
