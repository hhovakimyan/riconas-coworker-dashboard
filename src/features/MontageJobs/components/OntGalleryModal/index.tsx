import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PhotoListItem } from 'features/MontageJobs/types/ont';
import {
  IMAGE_ALLOWED_TYPES,
  IMAGE_MAX_SIZE_MB,
} from 'features/MontageJobs/constants/images';
import { ontPhotoService } from 'features/MontageJobs/services';

import GalleryModal from 'components/GalleryModal';
import LoadingSpinner from 'components/LoadingSpinner';
import { ServiceError } from 'services/helperTypes';

type Props = {
  ontId: string;
  photos: PhotoListItem[];
  onClose: () => void;
  onPhotosChange: (newPhotos: PhotoListItem[]) => void;
};

const OntGalleryModal = ({ ontId, photos, onClose, onPhotosChange }: Props) => {
  const { t } = useTranslation('montage-jobs', {
    keyPrefix: 'ontModal.galleryModal',
  });

  const [photosList, setPhotosList] = useState<PhotoListItem[] | null>(photos);

  const closeModal = () => {
    setPhotosList(null);
    onClose();
  };

  const onNewPhotosUpload = async (uploadedPhotos: FileList | never[]) => {
    const formData = new FormData();

    Array.from(uploadedPhotos).forEach((file: File) => {
      formData.append('files[]', file, file.name);
    });

    const result = await ontPhotoService.uploadPhotos(ontId, formData);

    if (result instanceof ServiceError) {
      return false;
    }

    const newPhotosList = [...(photosList || []), ...result.items];
    setPhotosList(newPhotosList);

    onPhotosChange(newPhotosList);

    return true;
  };

  const onPhotoDelete = async (photoId: string) => {
    if (!photosList) {
      return false;
    }

    const deleteResponse = await ontPhotoService.deletePhoto(ontId, photoId);
    if (deleteResponse instanceof ServiceError) {
      return false;
    }

    const newPhotosList = photosList.filter(
      (photoItem) => photoItem.id !== photoId,
    );
    setPhotosList(newPhotosList);
    onPhotosChange(newPhotosList);

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

export default OntGalleryModal;
