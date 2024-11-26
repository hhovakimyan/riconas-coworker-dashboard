import {
  FetchJobListQueryParams,
  FetchJobListResponseDto,
  UpdatePropsRequestDto,
  UpdatePropsResponseDto,
} from 'features/BlowInJobs/services/models/TableList';

import { ServiceError } from 'services/helperTypes';

interface ITableListService {
  fetchList(
    queryParams: FetchJobListQueryParams,
  ): Promise<FetchJobListResponseDto | ServiceError>;

  updateProps(
    jobId: string,
    requestData: UpdatePropsRequestDto,
  ): Promise<UpdatePropsResponseDto | ServiceError>;
}

export default ITableListService;
