import { fireEvent, render, screen } from '@testing-library/react';
import OntActivationBtn from 'features/MontageJobs/components/LocationCell/OntActivationBtn';
import { Status as OntStatus } from 'features/MontageJobs/types/ont';

const onActivateBtnClick = jest.fn();

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: jest.fn(),
  }),
}));

it('Renders correctly when ONT is active', () => {
  render(
    <OntActivationBtn
      ontId="123"
      isOntActive
      ontStatus={OntStatus.INSTALLED}
      onClick={onActivateBtnClick}
    />,
  );

  const buttonElement = screen.getByRole('button');
  expect(buttonElement.getAttribute('disabled')).toBeNull();

  fireEvent.click(buttonElement);
  expect(onActivateBtnClick).toBeCalledWith('123');
});

it('Renders correctly when ONT is inactive', () => {
  render(
    <OntActivationBtn
      ontId="123"
      isOntActive={false}
      ontStatus={OntStatus.INSTALLED}
      onClick={onActivateBtnClick}
    />,
  );

  const buttonElement = screen.getByRole('button');
  expect(buttonElement.getAttribute('disabled')).toBe('');

  fireEvent.click(buttonElement);
  expect(onActivateBtnClick).not.toBeCalled();
});

it('Renders correctly when ONT status is installed', () => {
  render(
    <OntActivationBtn
      ontId="123"
      isOntActive
      ontStatus={OntStatus.INSTALLED}
      onClick={onActivateBtnClick}
    />,
  );

  const buttonElement = screen.getByRole('button');
  expect(buttonElement.getAttribute('class')).toContain(
    'MuiButton-containedSuccess',
  );
});

it('Renders correctly when ONT status is not installed', () => {
  render(
    <OntActivationBtn
      ontId="123"
      isOntActive
      ontStatus={OntStatus.NOT_INSTALLED}
      onClick={onActivateBtnClick}
    />,
  );

  const buttonElement = screen.getByRole('button');
  expect(buttonElement.getAttribute('class')).toContain(
    'MuiButton-containedInfo',
  );
});
