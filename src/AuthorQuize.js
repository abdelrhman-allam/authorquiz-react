import React from 'react';
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css'

function Book({title, onClick}){
  return (<div className="answer" onClick={() => {onClick(title);}}>
    <h4>{title}</h4>
  </div>
  )
}
function Hero(){
  return (
    <div className='row'>
    <div className='jumbotron col-10 offset-1'>
      <h1>
        Author Quize
      </h1>
      <p>Select a book written by author shown</p>
    </div>
    </div>
  );
}

function Turn({author, books, highlight, onAnswerSelected}){
  function highlightToBackground(highlight){
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    } 

    return mapping[highlight];
  }

  return (<div className='row turn' style={{backgroundColor: highlightToBackground(highlight)}}>
    <div className='col-4 offset-1'> 
    <img src={ author.imageUrl} className="authorImage" alt="author" />
    </div>
    <div className="col-6">
      { books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
    </div>
  </div>)
}

Turn.propTypes = {
  Author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlight: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
}
function Continue(){
  return (<div></div>)
}

function Footer(){
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All Images From 
        </p>
      </div>
      </div>
  );
}

function AuthorQuize({turnData, highlight, onAnswerSelected}) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue />
      <Footer />
    </div>
  );
}

export default AuthorQuize;
