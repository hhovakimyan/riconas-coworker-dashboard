import { BasePhotoListItem } from 'types/generic';

export enum Status {
  NOT_INSTALLED = 'NOT_INSTALLED',
  PREINSTALLED = 'PREINSTALLED',
  INSTALLED = 'INSTALLED',
}

export type PhotoListItem = BasePhotoListItem;

export type DetailsProps = {
  id: string;
  code: string;
  splitter_code: string;
  splitter_fiber: string;
  odf_code_planned: string;
  odf_code: string;
  odf_pos_planned: string;
  odf_pos: string;
  type: string;
  status: Status;
  photos: PhotoListItem[];
  signature: string | null;
};

export type EditableProps = {
  ontType?: string;
  odfCode?: string;
  odfPos?: string;
  ontPreInstalled?: boolean;
  ontInstalled?: boolean;
  signature?: string;
};
