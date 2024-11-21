import { fireEvent, render, screen } from '@testing-library/react';

import ConfirmationDialog from 'components/ConfirmationDialog';

const onSubmitMock = jest.fn();
const onCloseMock = jest.fn();

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: jest.fn(),
  }),
}));

it('Component renders correctly with required props', () => {
  render(
    <ConfirmationDialog
      title="My Dialog"
      content={<span>Delete Item?</span>}
      onSubmit={onSubmitMock}
      onClose={onCloseMock}
    />,
  );

  const dialogElement = screen.getByRole('dialog');
  expect(dialogElement).toBeInTheDocument();

  const titleElement = screen.getByRole('heading');
  expect(titleElement.textContent).toContain('My Dialog');

  const dialogContentElement = screen.getByTestId('dialog-content');
  expect(dialogContentElement).toContainHTML('<span>Delete Item?</span>');

  const okBtn = screen.getByTestId('confirmBtn');
  fireEvent.click(okBtn);
  expect(onSubmitMock).toBeCalled();

  const closeBtn = screen.getByTestId('closeBtn');
  fireEvent.click(closeBtn);
  expect(onCloseMock).toBeCalled();

  // Expect loading spinner not to be rendered as isLoading prop's default is false
  const loadingSpinner = screen.queryByRole('progressbar');
  expect(loadingSpinner).not.toBeInTheDocument();
});

it('Component renders cancel button correctly', () => {
  render(
    <ConfirmationDialog
      title="My Dialog"
      content={<span>Delete Item?</span>}
      onSubmit={onSubmitMock}
      onClose={onCloseMock}
      cancelBtnProps={{
        text: 'Cancel',
        variant: 'text',
      }}
    />,
  );

  const cancelBtn = screen.getByTestId('cancelBtn');
  expect(cancelBtn).toBeInTheDocument();
  expect(cancelBtn.textContent).toEqual('Cancel');

  // When giving variant attribute to MUI Button it sets special class on HTML
  expect(cancelBtn.getAttribute('class')).toContain('MuiButton-text');

  fireEvent.click(cancelBtn);
  expect(onCloseMock).toBeCalled();
});

it('Component renders passed text on confirm button', () => {
  render(
    <ConfirmationDialog
      title="My Dialog"
      content={<span>Delete Item?</span>}
      onSubmit={onSubmitMock}
      onClose={onCloseMock}
      confirmText="Confirm this"
    />,
  );

  const okBtn = screen.getByTestId('confirmBtn');
  expect(okBtn.textContent).toEqual('Confirm this');
});

it('Component renders loading spinner when isLoading prop passed', () => {
  render(
    <ConfirmationDialog
      title="My Dialog"
      content={<span>Delete Item?</span>}
      onSubmit={onSubmitMock}
      onClose={onCloseMock}
      isLoading
    />,
  );

  const loadingSpinner = screen.getByRole('progressbar');
  expect(loadingSpinner).toBeInTheDocument();
});
