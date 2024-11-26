import { Status as HupStatus } from 'features/MontageJobs/types/hups';
import { Status as OntStatus } from 'features/MontageJobs/types/ont';

import { BasePhotoListItem } from 'types/generic';

export type OntListItem = {
  id: string;
  code: string;
  status: OntStatus;
  is_active: boolean;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone1: string | null;
  customer_phone2: string | null;
};

export type PhotoListItem = BasePhotoListItem;

export type ApiListItem = {
  id: string;
  address_line1: string;
  address_line2: string;
  building_type: string;
  hb_file_path: string | null;
  tb_file_path: string | null;
  complete_date: string;
  nvt_code: string;
  subproject_code: string;
  cabel_type: string;
  cabel_type_planned: string;
  cabel_code: string;
  cabel_code_planned: string;
  cabel_length: number;
  disability_length: number;
  cabel_position: string;
  tube_color: string;
  tube_color_planned: string;
  hup_code: string;
  hup_status: HupStatus;
  hup_customer_name: string;
  hup_customer_email: string;
  hup_customer_phone_number1: string;
  hup_customer_phone_number2: string;
  comment: string;
  ont: OntListItem[];
  photos_count: number;
};

export type DispatcherFields = {
  jobStatus: string;
  note: string;
};
