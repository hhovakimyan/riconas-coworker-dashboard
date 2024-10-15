import { FetchPaginatedListQueryParams } from 'services/models/QueryParams';
import { JobApiListItem } from 'types/montage-jobs';

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