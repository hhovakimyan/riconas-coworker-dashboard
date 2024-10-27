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
  tb_file_path: string | null;
  registration_date: string;
  nvt_code: string;
  subproject_code: string;
  project_name: string;
  coworker_name: string;
  cabel_type: string;
  cabel_type_planned: string;
  band_code: string;
  band_code_planned: string;
  cabel_color: string;
  cabel_color_planned: string;
  cabel_start: number;
  cabel_end: number;
  cabel_total_length: number;
  cabel_position: string;
  comment: string;
  photos_count: number;
  is_nvt_set: boolean | null;
  is_blow_in_done: boolean | null;
}

export type JobUiListItem = {
  id: string;
  address_line1: string;
  address_line2: string;
  building_type: string;
  hb_file_path: string | null;
  tb_file_path: string | null;
  registration_date: string;
  nvt_code: string;
  subproject_code: string;
  project_name: string;
  coworker_name: string;
  cabel_type: string;
  cabel_type_planned: string;
  band_code: string;
  band_code_planned: string;
  cabel_color: string;
  cabel_color_planned: string;
  cabel_start: number;
  cabel_end: number;
  cabel_total_length: number;
  cabel_position: string;
  comment: string;
  photos_count: number;
  is_nvt_set: string;
  is_blow_in_done: string;
}