import { Service } from 'services/Service';
import { httpClient } from 'services/axiosInstance';
import { ServiceError } from 'services/helperTypes';
import {
  FetchHupDetailsResponseDto,
  UpdateHupDetailsRequestDto,
  UpdateHupDetailsResponseDto,
} from 'services/models/Hups';
import { DeleteJobPhotoResponseDto, UploadJobPhotosResponseDto } from 'services/models/MontageJobs';

const apiPath = "/montage-jobs";

class HupService extends Service {
  async fetchDetails(jobId: string): Promise<FetchHupDetailsResponseDto | ServiceError> {
    try {
      return await httpClient.get<FetchHupDetailsResponseDto | ServiceError>(
        `${apiPath}/${jobId}/hup`,
        undefined,
        FetchHupDetailsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async updateDetails(
    jobId: string,
    requestData: UpdateHupDetailsRequestDto
  ): Promise<UpdateHupDetailsResponseDto | ServiceError> {
    try {
      return await httpClient.put<UpdateHupDetailsResponseDto | ServiceError>(
        `${apiPath}/${jobId}/hup`,
        undefined,
        requestData,
        UpdateHupDetailsResponseDto,
        true,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async deletePhoto(jobId: string, photoId: string): Promise<DeleteJobPhotoResponseDto | ServiceError> {
    try {
      return await httpClient.delete<DeleteJobPhotoResponseDto | ServiceError>(
        `${apiPath}/${jobId}/hup/photos/${photoId}`,
        undefined,
        {},
        DeleteJobPhotoResponseDto,
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }

  async uploadPhotos(jobId: string, formData: FormData): Promise<UploadJobPhotosResponseDto | ServiceError> {
    try {
      return await httpClient.post<UploadJobPhotosResponseDto | ServiceError>(
        `${apiPath}/${jobId}/hup/photos`,
        undefined,
        formData,
        UploadJobPhotosResponseDto,
        true,
        { 'Content-Type': 'multipart/form-data' }
      );
    } catch (error: any) {
      return this.getServiceError(error);
    }
  }
}

export default HupService;