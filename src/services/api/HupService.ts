import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';
import {
  FetchHupDetailsResponseDto,
  UpdateHupDetailsRequestDto,
  UpdateHupDetailsResponseDto,
} from 'services/models/Hups';

const apiPath = "/montage-jobs";

class HupService extends Service {
  async fetchDetails(jobId: string): Promise<FetchHupDetailsResponseDto | ServiceError> {
    try {
      return await httpClient.get<FetchHupDetailsResponseDto | ServiceError>(
        `${apiPath}/${jobId}/hup`,
        undefined,
        FetchHupDetailsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async updateDetails(
    jobId: string,
    requestData: UpdateHupDetailsRequestDto
  ): Promise<UpdateHupDetailsResponseDto | ServiceError> {
    try {
      return await httpClient.put<UpdateHupDetailsResponseDto | ServiceError>(
        `${apiPath}/${jobId}/hup`,
        undefined,
        requestData,
        UpdateHupDetailsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default HupService;