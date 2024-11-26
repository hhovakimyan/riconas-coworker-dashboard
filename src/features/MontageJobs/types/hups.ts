import { BasePhotoListItem } from 'types/generic';

export enum Status {
  NOT_INSTALLED = 'NOT_INSTALLED',
  PREINSTALLED = 'PREINSTALLED',
  INSTALLED = 'INSTALLED',
}

export type EditableProps = {
  hupType?: string;
  hupLocation?: string;
  hupPreInstalled?: boolean;
  hupInstalled?: boolean;
};

export type PhotoListItem = BasePhotoListItem;

export type DetailsApiItem = {
  id: string;
  hup_type: string | null;
  location: string | null;
  status: Status;
  opened_photos: PhotoListItem[];
  closed_photos: PhotoListItem[];
};

export enum PhotoState {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED',
}
