import {
  DetailsApiItem,
  PhotoListItem,
  Status,
} from 'features/MontageJobs/types/hups';

export class FetchDetailsResponseDto {
  data!: DetailsApiItem;
}

export class UpdateDetailsRequestDto {
  hup_type?: string;

  location?: string;

  is_pre_installed?: boolean;

  is_installed?: boolean;
}

export class UpdateDetailsResponseDto {
  data!: {
    id: string;
    hup_type: string | null;
    location: string | null;
    status: Status;
  };
}

export class DeletePhotoResponseDto {}

export class UploadPhotosResponseDto {
  items!: PhotoListItem[];
}
