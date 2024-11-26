import {
  FetchDetailsResponseDto,
  UpdateDetailsRequestDto,
  UpdateDetailsResponseDto,
} from 'features/MontageJobs/services/models/Hups';

import { ServiceError } from 'services/helperTypes';

interface IHupService {
  fetchDetails(jobId: string): Promise<FetchDetailsResponseDto | ServiceError>;

  updateDetails(
    jobId: string,
    requestData: UpdateDetailsRequestDto,
  ): Promise<UpdateDetailsResponseDto | ServiceError>;
}

export default IHupService;
