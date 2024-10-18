import { HupStatus } from 'types/hups';

export enum OntStatus {
  NOT_INSTALLED = 'NOT_INSTALLED',
  PREINSTALLED = 'PREINSTALLED',
  INSTALLED = 'INSTALLED',
}

export type JobOntItem = {
  id: string;
  code: string;
  status: OntStatus;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone1: string | null;
  customer_phone2: string | null;
}

export type JobPhotoListItem = {
  id: string;
  path: string;
};

export type JobApiListItem = {
  id: string;
  address_line1: string;
  address_line2: string;
  building_type: string;
  hb_file_path: string | null;
  registration_date: string;
  nvt_code: string;
  subproject_code: string;
  project_name: string;
  coworker_name: string;
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
  ont: JobOntItem[];
  photos_count: number;
}