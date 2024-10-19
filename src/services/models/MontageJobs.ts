import { FetchPaginatedListQueryParams } from 'services/models/QueryParams';
import { JobApiListItem, JobPhotoListItem } from 'types/montage-jobs';

export class FetchJobListQueryParams extends FetchPaginatedListQueryParams {
  client_id?: string;

  project_id?: string;

  subproject_id?: string;

  nvt_id?: string;

  constructor(
    page: number,
    perPage: number,
    clientId?: string,
    projectId?: string,
    subprojectId?: string,
    nvtId?: string
  ) {
    super(page, perPage);

    this.client_id = clientId;
    this.project_id = projectId;
    this.subproject_id = subprojectId;
    this.nvt_id = nvtId;
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

export class UploadJobPhotosResponseDto {
  items!: JobPhotoListItem[];
}