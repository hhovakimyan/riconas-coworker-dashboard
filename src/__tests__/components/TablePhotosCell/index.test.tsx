import { render, screen } from '@testing-library/react';

import TablePhotosCell from 'components/TablePhotosCell';

const onGalleryBtnClickMock = jest.fn();

it('Component renders correctly', () => {
  render(
    <table>
      <tbody>
        <tr>
          <TablePhotosCell
            photosCount={3}
            onGalleryBtnClick={onGalleryBtnClickMock}
          />
        </tr>
      </tbody>
    </table>,
  );
  const tableCellElement = screen.getByRole('cell');
  const galleryBtnElement = screen.getByRole('button');

  expect(tableCellElement).toBeInTheDocument();
  expect(galleryBtnElement).toBeInTheDocument();
  expect(galleryBtnElement.innerHTML).toContain('(3)');
});
