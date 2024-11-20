import { render, screen } from '@testing-library/react';

import PhoneLink from 'components/PhoneLink';

it('Component renders correctly', () => {
  const phoneNumber = '+245678123';

  render(<PhoneLink phoneNumber={phoneNumber} />);
  const linkElement = screen.getByText(phoneNumber);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.getAttribute('href')).toBe(`tel:${phoneNumber}`);
});
