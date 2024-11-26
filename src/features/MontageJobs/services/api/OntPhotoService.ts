import {
  DeleteOntPhotoResponseDto,
  UploadOntPhotosResponseDto,
} from 'features/MontageJobs/services/models/Ont';
import IOntPhotoService from 'features/MontageJobs/services/interfaces/IOntPhotoService';

import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';

const apiPath = '/montage-jobs/ont';

class OntPhotoService extends Service implements IOntPhotoService {
  async deletePhoto(
    ontId: string,
    photoId: string,
  ): Promise<DeleteOntPhotoResponseDto | ServiceError> {
    try {
      return await httpClient.delete<DeleteOntPhotoResponseDto | ServiceError>(
        `${apiPath}/${ontId}/photos/${photoId}`,
        undefined,
        {},
        DeleteOntPhotoResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async uploadPhotos(
    ontId: string,
    formData: FormData,
  ): Promise<UploadOntPhotosResponseDto | ServiceError> {
    try {
      return await httpClient.post<UploadOntPhotosResponseDto | ServiceError>(
        `${apiPath}/${ontId}/photos`,
        undefined,
        formData,
        UploadOntPhotosResponseDto,
        true,
        { 'Content-Type': 'multipart/form-data' },
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default OntPhotoService;
