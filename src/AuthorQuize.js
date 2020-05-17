import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css'

function Book({title}){
  return (<div className="answer">
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

function Turn({author, books}){
  return (<div className='row turn' style={{backgroundColor: 'white'}}>
    <div className='col-4 offset-1'> 
    <img src={ author.imageUrl} className="authorImage" alt="author" />
    </div>
    <div className="col-6">
      { books.map((title) => <Book title={title} key={title} />)}
    </div>
  </div>)
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

function AuthorQuize({turnData}) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData}/>
      <Continue />
      <Footer />
    </div>
  );
}

export default AuthorQuize;
