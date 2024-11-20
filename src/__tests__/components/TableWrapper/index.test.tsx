import { render, screen } from '@testing-library/react';

import TableWrapper from 'components/TableWrapper';

it('Component renders correctly', () => {
  render(
    <TableWrapper>
      <table />
    </TableWrapper>,
  );

  const wrapperElement = screen.getByTestId('tableWrapper');
  expect(wrapperElement).toBeInTheDocument();
  expect(wrapperElement).toContainHTML('<table></table>');
});
