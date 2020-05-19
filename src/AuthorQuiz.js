import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './App.css';
import './bootstrap.min.css'

function Book({ title, onClick }) {
  return (<div className="answer" onClick={() => { onClick(title); }}>
    <h4>{title}</h4>
  </div>
  )
}
function Hero() {
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

function Turn({ author, books, highlight, onAnswerSelected }) {
  console.log('highlight:', highlight);
  function highlightToBackground(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    }

    return mapping[highlight];
  }

  return (<div className='row turn' style={{ backgroundColor: highlightToBackground(highlight) }}>
    <div className='col-4 offset-1'>
      <img src={author.imageUrl} className="authorImage" alt="author" />
    </div>
    <div className="col-6">
      {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
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
function Continue({ show, onContinue }) {
  return (<div className='row'>
    {show ? <div className="col-11">
      <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button> </div> : null
    }
  </div>)
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All Images From <a href="wikimedia.com">wikimedia commons</a>
        </p>
      </div>
    </div>
  );
}

function mapStateToProps(state){
  return {
    turnData: state.turnData,
    books: state.books,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch){
  return {
    onAnswerSelected: (answer) => {
      dispatch({type: 'ANSWER_SELECTED', answer}) // <-- here answer is dispatched to reducer
    },
    onContinue: () => {
      dispatch({'type': 'CONTINUE'})
    }
  }
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function({ turnData, highlight, onAnswerSelected, onContinue }) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={highlight === 'correct'} onContinue={onContinue} />
        <p><Link to="/add">Add an Author</Link></p>
        <Footer />
      </div>
    );
  }
);

export default AuthorQuiz;
