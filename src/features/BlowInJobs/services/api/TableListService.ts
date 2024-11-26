import {
  FetchJobListQueryParams,
  FetchJobListResponseDto,
  UpdatePropsRequestDto,
  UpdatePropsResponseDto,
} from 'features/BlowInJobs/services/models/TableList';
import { ITableListService } from 'features/BlowInJobs/services/interfaces';

import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';

const apiPath = '/blow-in-jobs';

class TableListService extends Service implements ITableListService {
  async fetchList(
    queryParams: FetchJobListQueryParams,
  ): Promise<FetchJobListResponseDto | ServiceError> {
    if (!queryParams.client_id) {
      delete queryParams.client_id;
    }

    if (!queryParams.project_id) {
      delete queryParams.project_id;
    }

    if (!queryParams.subproject_id) {
      delete queryParams.subproject_id;
    }

    if (!queryParams.nvt_id) {
      delete queryParams.nvt_id;
    }

    try {
      return await httpClient.get<FetchJobListResponseDto | ServiceError>(
        apiPath,
        queryParams,
        FetchJobListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async updateProps(
    jobId: string,
    requestData: UpdatePropsRequestDto,
  ): Promise<UpdatePropsResponseDto | ServiceError> {
    try {
      return await httpClient.put<UpdatePropsResponseDto | ServiceError>(
        `${apiPath}/${jobId}`,
        undefined,
        requestData,
        UpdatePropsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default TableListService;
