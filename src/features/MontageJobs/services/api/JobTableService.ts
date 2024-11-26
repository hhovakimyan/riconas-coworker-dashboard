import {
  FetchListQueryParams,
  FetchListResponseDto,
  SaveCommentRequestDto,
  SaveCommentResponseDto,
  UpdateCabelPropsRequestDto,
  UpdateCabelPropsResponseDto,
} from 'features/MontageJobs/services/models/Jobs';
import { IJobTableService } from 'features/MontageJobs/services/interfaces';

import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';

const apiPath = '/montage-jobs';

class JobTableService extends Service implements IJobTableService {
  async fetchList(
    queryParams: FetchListQueryParams,
  ): Promise<FetchListResponseDto | ServiceError> {
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
      return await httpClient.get<FetchListResponseDto | ServiceError>(
        apiPath,
        queryParams,
        FetchListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async updateCabelProps(
    jobId: string,
    requestData: UpdateCabelPropsRequestDto,
  ): Promise<UpdateCabelPropsResponseDto | ServiceError> {
    try {
      return await httpClient.put<UpdateCabelPropsResponseDto | ServiceError>(
        `${apiPath}/${jobId}/cabel-props`,
        undefined,
        requestData,
        UpdateCabelPropsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async saveComment(
    jobId: string,
    requestData: SaveCommentRequestDto,
  ): Promise<SaveCommentResponseDto | ServiceError> {
    try {
      return await httpClient.post<SaveCommentResponseDto | ServiceError>(
        `${apiPath}/${jobId}/comment`,
        undefined,
        requestData,
        SaveCommentResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default JobTableService;
