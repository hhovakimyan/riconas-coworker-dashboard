import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  IMAGE_ALLOWED_TYPES,
  IMAGE_MAX_SIZE_MB,
} from 'features/BlowInJobs/constants/images';
import { PhotoListItem } from 'features/BlowInJobs/types';
import { photoService } from 'features/BlowInJobs/services';
import { FetchPhotosListResponseDto } from 'features/BlowInJobs/services/models/Photos';

import GalleryModal from 'components/GalleryModal';
import LoadingSpinner from 'components/LoadingSpinner';
import { ServiceError } from 'services/helperTypes';

type Props = {
  jobId: string;
  onClose: (photosCount: number) => void;
};

const JobGalleryModal = ({ jobId, onClose }: Props) => {
  const { t } = useTranslation('blow-in-jobs', { keyPrefix: 'galleryModal' });

  const [photosList, setPhotosList] = useState<PhotoListItem[] | null>(null);

  useEffect(() => {
    photoService.fetchPhotosList(jobId).then((response) => {
      if (response instanceof FetchPhotosListResponseDto && response.items) {
        setPhotosList(response.items);
      }
    });
  }, []);

  const closeModal = () => {
    setPhotosList(null);
    onClose(photosList?.length || 0);
  };

  const onNewPhotosUpload = async (uploadedPhotos: FileList | never[]) => {
    const formData = new FormData();

    Array.from(uploadedPhotos).forEach((file: File) => {
      formData.append('files[]', file, file.name);
    });

    const result = await photoService.uploadPhotos(jobId, formData);

    if (result instanceof ServiceError) {
      return false;
    }

    const newPhotosList = [...(photosList || []), ...result.items];
    setPhotosList(newPhotosList);

    return true;
  };

  const onPhotoDelete = async (photoId: string) => {
    if (!photosList) {
      return false;
    }

    const deleteResponse = await photoService.deletePhoto(jobId, photoId);
    if (deleteResponse instanceof ServiceError) {
      return false;
    }

    const newPhotosList = photosList.filter(
      (photoItem) => photoItem.id !== photoId,
    );
    setPhotosList(newPhotosList);

    return true;
  };

  if (photosList === null) {
    return <LoadingSpinner />;
  }

  return (
    <GalleryModal
      modalTitle={t('title')}
      onClose={closeModal}
      photos={photosList}
      imageMaxSizeMb={IMAGE_MAX_SIZE_MB}
      allowedImageTypes={IMAGE_ALLOWED_TYPES}
      onImagesUpload={onNewPhotosUpload}
      onImageDelete={onPhotoDelete}
      t={t}
    />
  );
};

export default JobGalleryModal;
