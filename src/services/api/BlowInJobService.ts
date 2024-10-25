import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';
import { FetchJobListQueryParams, FetchJobListResponseDto } from 'services/models/BlowInJobs';

const apiPath = "/blow-in-jobs";

class BlowInJobService extends Service {
  async fetchList(queryParams: FetchJobListQueryParams): Promise<FetchJobListResponseDto | ServiceError> {
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
}

export default BlowInJobService;