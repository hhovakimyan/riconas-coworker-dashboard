import { PhotoListItem } from 'features/BlowInJobs/types';

export class FetchPhotosListResponseDto {
  items!: PhotoListItem[];

  total_count!: number;
}

export class DeletePhotoResponseDto {}

export class UploadPhotosResponseDto {
  items!: PhotoListItem[];
}
