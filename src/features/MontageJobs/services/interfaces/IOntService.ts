import {
  FetchDetailsResponseDto,
  UpdateDetailsRequestDto,
  UpdateDetailsResponseDto,
} from 'features/MontageJobs/services/models/Ont';

import { ServiceError } from 'services/helperTypes';

interface IOntService {
  fetchDetails(ontId: string): Promise<FetchDetailsResponseDto | ServiceError>;

  updateDetails(
    ontId: string,
    requestData: UpdateDetailsRequestDto,
  ): Promise<UpdateDetailsResponseDto | ServiceError>;
}

export default IOntService;
