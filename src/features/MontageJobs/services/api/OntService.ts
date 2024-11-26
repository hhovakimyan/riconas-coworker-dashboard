import {
  DeleteOntPhotoResponseDto,
  FetchDetailsResponseDto,
  UpdateDetailsRequestDto,
  UpdateDetailsResponseDto,
  UploadOntPhotosResponseDto,
} from 'features/MontageJobs/services/models/Ont';
import { IOntService } from 'features/MontageJobs/services/interfaces';

import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';

const apiPath = '/montage-jobs/ont';

class OntService extends Service implements IOntService {
  async fetchDetails(
    ontId: string,
  ): Promise<FetchDetailsResponseDto | ServiceError> {
    try {
      return await httpClient.get<FetchDetailsResponseDto | ServiceError>(
        `${apiPath}/${ontId}`,
        undefined,
        FetchDetailsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async updateDetails(
    ontId: string,
    requestData: UpdateDetailsRequestDto,
  ): Promise<UpdateDetailsResponseDto | ServiceError> {
    try {
      return await httpClient.put<UpdateDetailsResponseDto | ServiceError>(
        `${apiPath}/${ontId}`,
        undefined,
        requestData,
        UpdateDetailsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

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

export default OntService;
