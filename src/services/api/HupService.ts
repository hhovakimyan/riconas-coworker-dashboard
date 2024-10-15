import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';
import { FetchHupDetailsResponseDto } from 'services/models/Hups';

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
}

export default HupService;