import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('页面渲染', () => {
  render(<App />);
  const recommendElement = screen.getByText(/Recommend/i);
  expect(recommendElement).toBeInTheDocument();
});
