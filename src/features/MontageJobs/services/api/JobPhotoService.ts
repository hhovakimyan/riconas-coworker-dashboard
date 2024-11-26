import { IJobPhotoService } from 'features/MontageJobs/services/interfaces';
import { FetchPhotosListResponseDto } from 'features/MontageJobs/services/models/Jobs';
import {
  DeletePhotoResponseDto,
  UploadPhotosResponseDto,
} from 'features/MontageJobs/services/models/Hups';

import { Service } from 'services/Service';
import { ServiceError } from 'services/helperTypes';
import { httpClient } from 'services/axiosInstance';

const apiPath = '/montage-jobs';

class JobPhotoService extends Service implements IJobPhotoService {
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

export default JobPhotoService;
