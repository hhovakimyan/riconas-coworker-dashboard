import { FetchPaginatedListQueryParams } from 'services/models/QueryParams';
import { JobApiListItem } from 'types/blow-in-jobs';

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