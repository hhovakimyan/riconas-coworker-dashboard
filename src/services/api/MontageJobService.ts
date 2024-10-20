import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';
import {
  FetchJobListQueryParams,
  FetchJobPhotosListResponseDto,
  FetchMontageJobListResponseDto,
  SaveCommentRequestDto,
  SaveCommentResponseDto,
  UpdateCabelPropsRequestDto,
  UpdateCabelPropsResponseDto,
} from 'services/models/MontageJobs';
import { DeleteHupPhotoResponseDto, UploadHupPhotosResponseDto } from 'services/models/Hups';

const apiPath = "/montage-jobs";

class MontageJobService extends Service {
  async fetchList(queryParams: FetchJobListQueryParams): Promise<FetchMontageJobListResponseDto | ServiceError> {
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

  async deletePhoto(jobId: string, photoId: string): Promise<DeleteHupPhotoResponseDto | ServiceError> {
    try {
      return await httpClient.delete<DeleteHupPhotoResponseDto | ServiceError>(
        `${apiPath}/${jobId}/photos/${photoId}`,
        undefined,
        {},
        DeleteHupPhotoResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async uploadPhotos(jobId: string, formData: FormData): Promise<UploadHupPhotosResponseDto | ServiceError> {
    try {
      return await httpClient.post<UploadHupPhotosResponseDto | ServiceError>(
        `${apiPath}/${jobId}/photos`,
        undefined,
        formData,
        UploadHupPhotosResponseDto,
        true,
        { 'Content-Type': 'multipart/form-data' }
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default MontageJobService;