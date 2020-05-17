import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuize from './AuthorQuize';
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


function getTrunData() {
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

const state = {
  turnData: getTrunData(),
  highlight: ''
}

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <AuthorQuize {...state} onAnswerSelected={onAnswerSelected} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
