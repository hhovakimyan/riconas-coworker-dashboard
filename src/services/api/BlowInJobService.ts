import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';
import {
  FetchJobListQueryParams,
  FetchJobListResponseDto,
  UpdatePropsRequestDto,
  UpdatePropsResponseDto,
  FetchJobPhotosListResponseDto,
  DeletePhotoResponseDto,
  UploadPhotosResponseDto,
} from 'services/models/BlowInJobs';

const apiPath = "/blow-in-jobs";

class BlowInJobService extends Service {
  async fetchList(queryParams: FetchJobListQueryParams):
    Promise<FetchJobListResponseDto | ServiceError>
  {
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
      return await httpClient.get<FetchJobListResponseDto | ServiceError>(
        apiPath,
        queryParams,
        FetchJobListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async updateProps(
    jobId: string,
    requestData: UpdatePropsRequestDto
  ): Promise<UpdatePropsResponseDto | ServiceError> {
    try {
      return await httpClient.put<UpdatePropsResponseDto | ServiceError>(
        `${apiPath}/${jobId}`,
        undefined,
        requestData,
        UpdatePropsResponseDto,
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

  async deletePhoto(jobId: string, photoId: string): Promise<DeletePhotoResponseDto | ServiceError> {
    try {
      return await httpClient.delete<DeletePhotoResponseDto | ServiceError>(
        `${apiPath}/${jobId}/photos/${photoId}`,
        undefined,
        {},
        DeletePhotoResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async uploadPhotos(jobId: string, formData: FormData): Promise<UploadPhotosResponseDto | ServiceError> {
    try {
      return await httpClient.post<UploadPhotosResponseDto | ServiceError>(
        `${apiPath}/${jobId}/photos`,
        undefined,
        formData,
        UploadPhotosResponseDto,
        true,
        { 'Content-Type': 'multipart/form-data' }
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default BlowInJobService;