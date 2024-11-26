import {
  DeletePhotoResponseDto,
  FetchPhotosListResponseDto,
  UploadPhotosResponseDto,
} from 'features/BlowInJobs/services/models/Photos';

import { ServiceError } from 'services/helperTypes';

interface IPhotoService {
  fetchPhotosList(
    jobId: string,
  ): Promise<FetchPhotosListResponseDto | ServiceError>;

  deletePhoto(
    jobId: string,
    photoId: string,
  ): Promise<DeletePhotoResponseDto | ServiceError>;

  uploadPhotos(
    jobId: string,
    formData: FormData,
  ): Promise<UploadPhotosResponseDto | ServiceError>;
}

export default IPhotoService;
