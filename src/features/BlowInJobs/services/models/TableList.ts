import { ApiListItem } from 'features/BlowInJobs/types';

import { FetchPaginatedListQueryParams } from 'services/models/QueryParams';

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
    nvtId?: string,
  ) {
    super(page, perPage);

    this.client_id = clientId;
    this.project_id = projectId;
    this.subproject_id = subprojectId;
    this.nvt_id = nvtId;
  }
}

export class FetchJobListResponseDto {
  items!: ApiListItem[];

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

  is_nvt_set?: string | null;

  is_blow_in_done?: string | null;
}

export class UpdatePropsResponseDto {}
