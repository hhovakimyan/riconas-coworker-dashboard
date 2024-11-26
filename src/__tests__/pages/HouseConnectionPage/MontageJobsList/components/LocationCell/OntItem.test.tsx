import { fireEvent, render, screen } from '@testing-library/react';
import OntItem from 'features/MontageJobs/components/LocationCell/OntItem';
import { OntStatus } from 'features/MontageJobs/types/main';

const onOntActivationBtnClick = jest.fn();
const onOntDispatcherBtnClick = jest.fn();

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: jest.fn(),
  }),
}));

it('Renders correctly without customer properties', () => {
  const ontItemData = {
    id: '123',
    code: '151f151515',
    status: OntStatus.INSTALLED,
    is_active: true,
    customer_name: null,
    customer_email: null,
    customer_phone1: null,
    customer_phone2: null,
  };

  render(
    <OntItem
      data={ontItemData}
      onOntActivationBtnClick={onOntActivationBtnClick}
      onOntDispatcherBtnClick={onOntDispatcherBtnClick}
    />,
  );

  const ontCodeElement = screen.getByTestId('ontCode');
  expect(ontCodeElement.textContent).toEqual('151f151515');

  const dispatchBtnElement = screen.getByTestId('dispatchBtn');
  fireEvent.click(dispatchBtnElement);
  expect(onOntDispatcherBtnClick).toBeCalledWith('123');
});

it('Renders correctly with customer properties', () => {
  const ontItemData = {
    id: '123',
    code: '151f151515',
    status: OntStatus.INSTALLED,
    is_active: true,
    customer_name: 'John Clowney',
    customer_email: 'john@mailinator.com',
    customer_phone1: '+2765432198',
    customer_phone2: '+2145432190',
  };

  render(
    <OntItem
      data={ontItemData}
      onOntActivationBtnClick={onOntActivationBtnClick}
      onOntDispatcherBtnClick={onOntDispatcherBtnClick}
    />,
  );

  const ontCustomerNameElement = screen.getByTestId('ontCustomerName');
  expect(ontCustomerNameElement.textContent).toBe('John Clowney');

  const ontCustomerEmailPhoneLinks = screen.getAllByRole('link');
  expect(ontCustomerEmailPhoneLinks.length).toBe(3);
});
