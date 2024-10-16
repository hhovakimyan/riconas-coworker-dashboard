export enum HupStatus {
  NOT_INSTALLED = 'NOT_INSTALLED',
  PREINSTALLED = 'PREINSTALLED',
  INSTALLED = 'INSTALLED',
}

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
}

export type HupDetailsApiItem = {
  id: string
  hup_type: string | null;
  location: string | null;
  status: HupStatus;
  opened_hup_photo_path: string | null;
  closed_hup_photo_path: string | null;
};