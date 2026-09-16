import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', {
    name: /employment offer email generator/i,
  });
  expect(heading).toBeInTheDocument();
});

test('renders subject and recipient email fields', () => {
  render(<App />);

  expect(screen.getByLabelText(/email subject/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/to email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/reply to/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/from name/i)).toBeInTheDocument();
});
