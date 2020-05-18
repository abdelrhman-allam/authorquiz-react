import React from 'react';
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet','The Adventures of Huckleberry Finn','Harray Potter and the Goblet of Fire',
    'Harray Potter and the Champer of Secrets'],
    author: {
      name: "Joseph Conrad",
      imageUrl: "/images/authors/josephconrad.jpg",
      imageSource: "Wikimedia Commons",
      books: [
        'Heart of Darkness'
      ]
    }
  },
  highlight: ''
}

describe('Author Quize', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => { }} />, div);
  })
})