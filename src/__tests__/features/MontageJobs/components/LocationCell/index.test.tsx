import { render, screen } from '@testing-library/react';
import LocationCell from 'features/MontageJobs/components/LocationCell';
import { ApiListItem } from 'features/MontageJobs/types/jobs';
import { Status as HupStatus } from 'features/MontageJobs/types/hups';

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: jest.fn(),
  }),
}));

const rowData: ApiListItem = {
  id: '15',
  address_line1: 'Hamburg',
  address_line2: 'Spotchers 3',
  building_type: 'SINGLE_HOUSE',
  hb_file_path: null,
  tb_file_path:
    'http://uploads.riconas.localhost/montage_jobs/nnF5CRV08u_hb_file.pdf',
  nvt_code: 'PRB1',
  subproject_code: 'PR1234',
  cabel_type: '12f',
  cabel_type_planned: '12f',
  cabel_code: 'TU05',
  cabel_code_planned: 'BR03',
  tube_color: 'BL1',
  tube_color_planned: 'VI1',
  cabel_position: '1',
  cabel_length: 500,
  disability_length: 200,
  hup_code: '1893737832-000',
  hup_status: HupStatus.NOT_INSTALLED,
  hup_customer_name: 'Stefan Fraizer',
  hup_customer_email: 'stefan.kraus2@mailinator.com',
  hup_customer_phone_number1: '8283919002',
  hup_customer_phone_number2: '8283919005',
  comment: 'Hello Jude',
  ont: [
    {
      id: '3',
      code: '002',
      status: OntStatus.PREINSTALLED,
      is_active: true,
      customer_name: 'Stefan Fraizer',
      customer_email: 'stefan.kraus2@mailinator.com',
      customer_phone1: '8283919002',
      customer_phone2: '8283919005',
    },
    {
      id: '4',
      code: '003',
      status: OntStatus.INSTALLED,
      is_active: true,
      customer_name: null,
      customer_email: null,
      customer_phone1: null,
      customer_phone2: null,
    },
  ],
  photos_count: 3,
  complete_date: '2024-10-21 18:25',
};

const onHupBtnClick = jest.fn();
const onHupDispatcherBtnClick = jest.fn();
const onOntBtnClick = jest.fn();
const onOntDispatcherBtnClick = jest.fn();

it('Renders passed ONT items', () => {
  render(
    <table>
      <tbody>
        <tr>
          <LocationCell
            rowData={rowData}
            onHupBtnClick={onHupBtnClick}
            onHupDispatcherBtnClick={onHupDispatcherBtnClick}
            onOntBtnClick={onOntBtnClick}
            onOntDispatcherBtnClick={onOntDispatcherBtnClick}
          />
        </tr>
      </tbody>
    </table>,
  );

  const ontItems = screen.getAllByTestId('ontItem');
  expect(ontItems.length).toBe(2);
});
