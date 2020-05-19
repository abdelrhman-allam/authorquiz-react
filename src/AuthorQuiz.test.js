import React from 'react';
import ReactDOM from 'react-dom'
import BrowserRouter, { MemoryRouter, Route } from 'react-router-dom'
// import { render } from '@testing-library/react';
import { AuthorQuiz } from './AuthorQuiz';
import Enzyme, { mount, shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shape } from 'prop-types'

Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['Hamlet', 'Heart of Darkness', 'The Adventures of Huckleberry Finn', 'Harray Potter and the Goblet of Fire',
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
  highlight: 'wrong'
}

function setup(highlight) {

  const props = {
    onAnswerSelected: jest.fn()
  }
  const enzymeWrapper = mount(<MemoryRouter><AuthorQuiz  {...Object.assign({}, state, {highlight: highlight})} {...props} /></MemoryRouter>)

  return {
    props,
    enzymeWrapper
  }
}

describe('Author Quiz', () => {
  it('renders without crashing', () => {
    const { enzymeWrapper } = setup('');
  })

  describe('H1 has correct value', () => {
    let enzymeWrapper;

    beforeAll(() => {
      enzymeWrapper = setup("").enzymeWrapper;
    });

    it('should have correct H1', () => {
      expect(enzymeWrapper.find('h1').text()).toBe('Author Quiz');
    });
  });
  
  describe('when no answer is selected', () => {
    let enzymeWrapper;
    beforeAll(() => {
      enzymeWrapper = setup("").enzymeWrapper;
    });
   
    it('should have no background color', () => {
      expect(enzymeWrapper.find('div.row.turn').props().style.backgroundColor).toBe('');
    });
  });

  describe('when correct answer is selected', () => {
    let enzymeWrapper;
    beforeAll(() => {
      enzymeWrapper = setup("correct").enzymeWrapper;
    });
   
    it('should have green background color', () => {
      expect(enzymeWrapper.find('div.row.turn').props().style.backgroundColor).toBe('green');
    });
  });

  describe('when wrong answer is selected', () => {
    let enzymeWrapper;
    beforeAll(() => {
      enzymeWrapper = setup("wrong").enzymeWrapper;
    });
   
    it('should have green background color', () => {
      expect(enzymeWrapper.find('div.row.turn').props().style.backgroundColor).toBe('red');
    });
  });
});

describe('Play Quiz', () => {
  describe('when first answer is selected', () => {
    let enzymeWrapper;
    const props = {
      onAnswerSelected: jest.fn()
    }
    beforeAll(() => {
      enzymeWrapper = mount(<MemoryRouter><AuthorQuiz  {...Object.assign({}, state, {highlight: ''})} {...props} /></MemoryRouter>)
      enzymeWrapper.find('.answer').first().simulate('click');
    });
    
    it('onAnswerSelect should be called', () => {
      expect(props.onAnswerSelected).toHaveBeenCalled();
    });

    it('selected answer should be Hamlet', () => {
      expect(props.onAnswerSelected).toHaveBeenCalledWith('Hamlet');
    });
  });
})