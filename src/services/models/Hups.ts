import { HupDetailsApiItem } from 'types/montage-jobs';

export class FetchHupDetailsResponseDto {
  data!: HupDetailsApiItem;
}

export class UpdateHupDetailsRequestDto {
  hup_type?: string;

  location?: string;

  is_pre_installed?: boolean;

  is_installed?: boolean;

  opened_hup_photo_path?: string;

  closed_hup_photo_path?: string;
}

export class UpdateHupDetailsResponseDto {}