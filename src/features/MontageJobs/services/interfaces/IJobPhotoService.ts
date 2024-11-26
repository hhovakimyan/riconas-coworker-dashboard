import { FetchPhotosListResponseDto } from 'features/MontageJobs/services/models/Jobs';
import {
  DeletePhotoResponseDto,
  UploadPhotosResponseDto,
} from 'features/MontageJobs/services/models/Hups';

import { ServiceError } from 'services/helperTypes';

interface IJobPhotoService {
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

export default IJobPhotoService;
