import {
  DeletePhotoResponseDto,
  UploadPhotosResponseDto,
} from 'features/MontageJobs/services/models/Jobs';
import IHupPhotoService from 'features/MontageJobs/services/interfaces/IHupPhotoService';

import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';

const apiPath = '/montage-jobs';

class HupPhotoService extends Service implements IHupPhotoService {
  async deletePhoto(
    jobId: string,
    photoId: string,
  ): Promise<DeletePhotoResponseDto | ServiceError> {
    try {
      return await httpClient.delete<DeletePhotoResponseDto | ServiceError>(
        `${apiPath}/${jobId}/hup/photos/${photoId}`,
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
        `${apiPath}/${jobId}/hup/photos`,
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

export default HupPhotoService;
