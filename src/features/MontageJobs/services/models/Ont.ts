import {
  DetailsProps,
  PhotoListItem,
  Status,
} from 'features/MontageJobs/types/ont';

export class FetchDetailsResponseDto {
  data!: DetailsProps;
}

export class UpdateDetailsRequestDto {
  ont_type?: string;

  odf_code?: string;

  odf_pos?: string;

  is_pre_installed?: boolean;

  is_installed?: boolean;

  signature?: string | null;
}

export class UpdateDetailsResponseDto {
  data!: {
    status: Status;
  };
}

export class DeleteOntPhotoResponseDto {}

export class UploadOntPhotosResponseDto {
  items!: PhotoListItem[];
}
