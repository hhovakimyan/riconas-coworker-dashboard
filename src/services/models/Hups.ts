import { HupDetailsApiItem, HupPhotoListItem } from 'types/hups';

export class FetchHupDetailsResponseDto {
  data!: HupDetailsApiItem;
}

export class UpdateHupDetailsRequestDto {
  hup_type?: string;

  location?: string;

  is_pre_installed?: boolean;

  is_installed?: boolean;
}

export class UpdateHupDetailsResponseDto {}

export class DeleteHupPhotoResponseDto {}

export class UploadHupPhotosResponseDto {
  items!: HupPhotoListItem[];
}