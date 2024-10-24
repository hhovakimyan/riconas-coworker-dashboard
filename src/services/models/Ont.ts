import { OntDetailsProps, OntPhotoListItem } from 'types/ont';

export class FetchOntDetailsResponseDto {
  data!: OntDetailsProps;
}

export class UpdateOntDetailsRequestDto {
  ont_type?: string;

  odf_code?: string;

  odf_pos?: string;

  is_pre_installed?: boolean;

  is_installed?: boolean;

  signature?: string | null;
}

export class UpdateOntDetailsResponseDto {}

export class DeleteOntPhotoResponseDto {}

export class UploadOntPhotosResponseDto {
  items!: OntPhotoListItem[];
}