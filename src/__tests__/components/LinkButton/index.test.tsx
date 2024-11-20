import { fireEvent, render, screen } from '@testing-library/react';

import LinkButton from 'components/LinkButton';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

it('Component renders correctly', () => {
  render(<LinkButton title="Click Me" link={'/login'} />);

  const linkBtnElement = screen.getByRole('button');
  expect(linkBtnElement).toBeInTheDocument();
  expect(linkBtnElement.innerHTML).toContain('Click Me');
});

it('Component does redirect to passed link', () => {
  render(<LinkButton title="Click Me" link={'/login'} />);

  const linkBtnElement = screen.getByRole('button');
  fireEvent.click(linkBtnElement);

  expect(mockUseNavigate).toBeCalledWith('/login');
});
