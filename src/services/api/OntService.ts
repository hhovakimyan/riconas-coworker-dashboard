import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';
import {
  DeleteOntPhotoResponseDto,
  FetchOntDetailsResponseDto,
  UpdateOntDetailsRequestDto,
  UpdateOntDetailsResponseDto,
  UploadOntPhotosResponseDto,
} from 'services/models/Ont';

const apiPath = "/montage-jobs/ont";

class OntService extends Service {
  async fetchDetails(ontId: string): Promise<FetchOntDetailsResponseDto | ServiceError> {
    try {
      return await httpClient.get<FetchOntDetailsResponseDto | ServiceError>(
        `${apiPath}/${ontId}`,
        undefined,
        FetchOntDetailsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async updateDetails(
    ontId: string,
    requestData: UpdateOntDetailsRequestDto
  ): Promise<UpdateOntDetailsResponseDto | ServiceError> {
    try {
      return await httpClient.put<UpdateOntDetailsResponseDto | ServiceError>(
        `${apiPath}/${ontId}`,
        undefined,
        requestData,
        UpdateOntDetailsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async deletePhoto(ontId: string, photoId: string): Promise<DeleteOntPhotoResponseDto | ServiceError> {
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

  async uploadPhotos(ontId: string, formData: FormData): Promise<UploadOntPhotosResponseDto | ServiceError> {
    try {
      return await httpClient.post<UploadOntPhotosResponseDto | ServiceError>(
        `${apiPath}/${ontId}/photos`,
        undefined,
        formData,
        UploadOntPhotosResponseDto,
        true,
        { 'Content-Type': 'multipart/form-data' }
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default OntService;