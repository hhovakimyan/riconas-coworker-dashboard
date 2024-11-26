import {
  FetchPhotosListResponseDto,
  DeletePhotoResponseDto,
  UploadPhotosResponseDto,
} from 'features/BlowInJobs/services/models/Photos';
import { IPhotoService } from 'features/BlowInJobs/services/interfaces';

import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';

const apiPath = '/blow-in-jobs';

class PhotoService extends Service implements IPhotoService {
  async fetchPhotosList(
    jobId: string,
  ): Promise<FetchPhotosListResponseDto | ServiceError> {
    try {
      return await httpClient.get<FetchPhotosListResponseDto | ServiceError>(
        `${apiPath}/${jobId}/photos`,
        undefined,
        FetchPhotosListResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async deletePhoto(
    jobId: string,
    photoId: string,
  ): Promise<DeletePhotoResponseDto | ServiceError> {
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

  async uploadPhotos(
    jobId: string,
    formData: FormData,
  ): Promise<UploadPhotosResponseDto | ServiceError> {
    try {
      return await httpClient.post<UploadPhotosResponseDto | ServiceError>(
        `${apiPath}/${jobId}/photos`,
        undefined,
        formData,
        UploadPhotosResponseDto,
        true,
        { 'Content-Type': 'multipart/form-data' },
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default PhotoService;
