import React from 'react';
import { render } from '@testing-library/react';
import AuthorQuize from './AuthorQuize';

test('renders learn react link', () => {
  const { getByText } = render(<AuthorQuize />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
