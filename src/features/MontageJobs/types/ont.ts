import { BasePhotoListItem } from 'types/generic';

export enum OntStatus {
  NOT_INSTALLED = 'NOT_INSTALLED',
  PREINSTALLED = 'PREINSTALLED',
  INSTALLED = 'INSTALLED',
}

export type OntPhotoListItem = BasePhotoListItem;

export type OntDetailsProps = {
  id: string;
  code: string;
  splitter_code: string;
  splitter_fiber: string;
  odf_code_planned: string;
  odf_code: string;
  odf_pos_planned: string;
  odf_pos: string;
  type: string;
  status: OntStatus;
  photos: OntPhotoListItem[];
  signature: string | null;
};

export type OntEditableProps = {
  ontType?: string;
  odfCode?: string;
  odfPos?: string;
  ontPreInstalled?: boolean;
  ontInstalled?: boolean;
  signature?: string;
};
