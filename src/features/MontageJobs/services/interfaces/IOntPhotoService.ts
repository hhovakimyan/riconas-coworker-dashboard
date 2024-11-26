import {
  DeleteOntPhotoResponseDto,
  UploadOntPhotosResponseDto,
} from 'features/MontageJobs/services/models/Ont';

import { ServiceError } from 'services/helperTypes';

interface IOntPhotoService {
  deletePhoto(
    ontId: string,
    photoId: string,
  ): Promise<DeleteOntPhotoResponseDto | ServiceError>;

  uploadPhotos(
    ontId: string,
    formData: FormData,
  ): Promise<UploadOntPhotosResponseDto | ServiceError>;
}

export default IOntPhotoService;
