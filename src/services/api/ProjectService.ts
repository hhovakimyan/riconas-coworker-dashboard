import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';
import { FetchProjectsListResponseDto } from 'services/models/Projects';

const apiPath = "/projects";

class ProjectService extends Service {
  async fetchList() {
    try {
      return await httpClient.get<FetchProjectsListResponseDto | ServiceError>(
        `${apiPath}` ,
        undefined,
        FetchProjectsListResponseDto,
        true
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default ProjectService;