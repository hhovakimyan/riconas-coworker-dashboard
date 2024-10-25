import { FetchPaginatedListQueryParams } from 'services/models/QueryParams';
import { JobApiListItem, JobPhotoListItem } from 'types/blow-in-jobs';

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

export class FetchJobListResponseDto {
  items!: JobApiListItem[];

  total_count!: number;
}

export class UpdatePropsRequestDto {
  cabel_type?: string;

  band_code?: string;

  cabel_color?: string;

  cabel_start?: number;

  cabel_end?: number;

  cabel_total_length?: number;

  comment?: string;

  is_nvt_set?: boolean | null;

  is_blow_in_done?: boolean | null;
}

export class UpdatePropsResponseDto {}

export class FetchJobPhotosListResponseDto {
  items!: JobPhotoListItem[];

  total_count!: number;
}

export class DeletePhotoResponseDto {}

export class UploadPhotosResponseDto {
  items!: JobPhotoListItem[];
}