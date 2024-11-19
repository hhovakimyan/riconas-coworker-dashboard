import { render, screen } from '@testing-library/react';

import PageTitle from 'components/PageTitle/index';

it('Component renders correctly when className is passed in props', () => {
  const title = 'Hello World';
  const titleClassName = 'myClass';

  render(<PageTitle className={titleClassName}>{title}</PageTitle>);

  const titleElement = screen.getByText(title);

  expect(titleElement).toBeInTheDocument();
  expect(titleElement.className).toBe(titleClassName);
});

it('Component renders correctly when className is not passed in props', () => {
  const title = 'Hello World';

  render(<PageTitle>{title}</PageTitle>);

  const titleElement = screen.getByText(title);

  expect(titleElement).toBeInTheDocument();
  expect(titleElement.className).toBeFalsy();
});
