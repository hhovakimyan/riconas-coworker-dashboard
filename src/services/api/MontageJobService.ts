import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';
import {
  DeleteJobPhotoResponseDto,
  FetchJobListQueryParams,
  FetchJobPhotosListResponseDto,
  FetchMontageJobListResponseDto,
  SaveCommentRequestDto,
  SaveCommentResponseDto,
  UpdateCabelPropsRequestDto,
  UpdateCabelPropsResponseDto,
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

  async updateCabelProps(
    jobId: string,
    requestData: UpdateCabelPropsRequestDto
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
    requestData: SaveCommentRequestDto
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

  async fetchPhotosList(jobId: string): Promise<FetchJobPhotosListResponseDto | ServiceError> {
    try {
      return await httpClient.get<FetchJobPhotosListResponseDto | ServiceError>(
        `${apiPath}/${jobId}/photos`,
        undefined,
        FetchJobPhotosListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async deletePhoto(jobId: string, photoId: string): Promise<DeleteJobPhotoResponseDto | ServiceError> {
    try {
      return await httpClient.delete<DeleteJobPhotoResponseDto | ServiceError>(
        `${apiPath}/${jobId}/photos/${photoId}`,
        undefined,
        {},
        DeleteJobPhotoResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default MontageJobService;