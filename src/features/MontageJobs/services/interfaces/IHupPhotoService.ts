import {
  DeletePhotoResponseDto,
  UploadPhotosResponseDto,
} from 'features/MontageJobs/services/models/Jobs';

import { ServiceError } from 'services/helperTypes';

interface IHupPhotoService {
  deletePhoto(
    jobId: string,
    photoId: string,
  ): Promise<DeletePhotoResponseDto | ServiceError>;

  uploadPhotos(
    jobId: string,
    formData: FormData,
  ): Promise<UploadPhotosResponseDto | ServiceError>;
}

export default IHupPhotoService;
