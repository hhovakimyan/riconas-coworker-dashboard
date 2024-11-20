import { render, screen } from '@testing-library/react';

import EmailLink from 'components/EmailLink';

it('Component renders correctly', () => {
  const emailAddress = 'developer@mailinator.com';

  render(<EmailLink emailAddress={emailAddress} />);
  const linkElement = screen.getByText(emailAddress);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.getAttribute('href')).toBe(`mailto:${emailAddress}`);
});
