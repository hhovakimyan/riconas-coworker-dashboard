import { BasePhotoListItem } from 'types/generic';

export enum HupStatus {
  NOT_INSTALLED = 'NOT_INSTALLED',
  PREINSTALLED = 'PREINSTALLED',
  INSTALLED = 'INSTALLED',
}

export type HupEditableProps = {
  hupType?: string;
  hupLocation?: string;
  hupPreInstalled?: boolean;
  hupInstalled?: boolean;
}

export type HupPhotoListItem = BasePhotoListItem;

export type HupDetailsApiItem = {
  id: string
  hup_type: string | null;
  location: string | null;
  status: HupStatus;
  opened_photos: HupPhotoListItem[];
  closed_photos: HupPhotoListItem[];
};

export enum HupPhotoState {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED',
}