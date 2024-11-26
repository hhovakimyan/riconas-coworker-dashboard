import {
  FetchDetailsResponseDto,
  UpdateDetailsRequestDto,
  UpdateDetailsResponseDto,
} from 'features/MontageJobs/services/models/Hups';
import { IHupService } from 'features/MontageJobs/services/interfaces';

import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';

const apiPath = '/montage-jobs';

class HupService extends Service implements IHupService {
  async fetchDetails(
    jobId: string,
  ): Promise<FetchDetailsResponseDto | ServiceError> {
    try {
      return await httpClient.get<FetchDetailsResponseDto | ServiceError>(
        `${apiPath}/${jobId}/hup`,
        undefined,
        FetchDetailsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async updateDetails(
    jobId: string,
    requestData: UpdateDetailsRequestDto,
  ): Promise<UpdateDetailsResponseDto | ServiceError> {
    try {
      return await httpClient.put<UpdateDetailsResponseDto | ServiceError>(
        `${apiPath}/${jobId}/hup`,
        undefined,
        requestData,
        UpdateDetailsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default HupService;
