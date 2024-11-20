import { render, screen } from '@testing-library/react';

import PageTitle from 'components/PageTitle';

const title = 'Hello World';
const titleClassName = 'myClass';

it('Component renders correctly when className is passed in props', () => {
  render(<PageTitle className={titleClassName}>{title}</PageTitle>);

  const titleElement = screen.getByText(title);

  expect(titleElement).toBeInTheDocument();
  expect(titleElement.className).toBe(titleClassName);
});

it('Component renders correctly when className is not passed in props', () => {
  render(<PageTitle>{title}</PageTitle>);

  const titleElement = screen.getByText(title);

  expect(titleElement).toBeInTheDocument();
  expect(titleElement.className).toBeFalsy();
});
