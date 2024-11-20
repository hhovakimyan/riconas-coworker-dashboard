import { render, screen } from '@testing-library/react';

import NoDataMessage from 'components/NoDataMessage';

it('Component renders correctly', () => {
  const message = 'No Data Found';

  render(<NoDataMessage message={message} />);

  const messageElement = screen.getByText(message);
  expect(messageElement).toBeInTheDocument();
});
