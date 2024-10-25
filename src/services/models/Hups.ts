import { HupDetailsApiItem, HupPhotoListItem, HupStatus } from 'types/hups';

export class FetchHupDetailsResponseDto {
  data!: HupDetailsApiItem;
}

export class UpdateHupDetailsRequestDto {
  hup_type?: string;

  location?: string;

  is_pre_installed?: boolean;

  is_installed?: boolean;
}

export class UpdateHupDetailsResponseDto {
  data!: {
    id: string
    hup_type: string | null;
    location: string | null;
    status: HupStatus;
  }
}

export class DeleteHupPhotoResponseDto {}

export class UploadHupPhotosResponseDto {
  items!: HupPhotoListItem[];
}