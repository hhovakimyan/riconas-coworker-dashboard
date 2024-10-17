import { FetchPaginatedListQueryParams } from 'services/models/QueryParams';
import { JobApiListItem, JobPhotoListItem } from 'types/montage-jobs';

export class FetchJobListQueryParams extends FetchPaginatedListQueryParams {
  project_id?: string;

  constructor(page: number, perPage: number, projectId?: string) {
    super(page, perPage);

    this.project_id = projectId;
  }
}

export class FetchMontageJobListResponseDto {
  items!: JobApiListItem[];

  total_count!: number;
}

export class UpdateCabelPropsRequestDto {
  cabel_type?: string;

  cabel_code?: string;

  tube_color?: string;

  cabel_length?: number;

  disability_length?: number;
}

export class UpdateCabelPropsResponseDto {}

export class SaveCommentRequestDto {
  comment!: string;
}

export class SaveCommentResponseDto {}

export class FetchJobPhotosListResponseDto {
  items!: JobPhotoListItem[];

  total_count!: number;
}

export class DeleteJobPhotoResponseDto {}