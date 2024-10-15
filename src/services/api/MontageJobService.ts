import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';
import {
  FetchJobListQueryParams,
  FetchMontageJobListResponseDto,
} from 'services/models/MontageJobs';

const apiPath = "/montage-jobs";

class MontageJobService extends Service {
  async fetchList(queryParams: FetchJobListQueryParams): Promise<FetchMontageJobListResponseDto | ServiceError> {
    if (!queryParams.project_id) {
      delete queryParams.project_id;
    }

    try {
      return await httpClient.get<FetchMontageJobListResponseDto | ServiceError>(
        apiPath,
        queryParams,
        FetchMontageJobListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default MontageJobService;