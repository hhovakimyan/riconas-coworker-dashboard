import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import GalleryModal from 'components/GalleryModal';
import { montageOntService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import { JOB_IMAGE_ALLOWED_TYPES, JOB_IMAGE_MAX_SIZE_MB } from 'constants/montageJobs';
import { ServiceError } from 'services/helperTypes';
import { OntPhotoListItem } from 'types/ont';

type Props = {
  ontId: string;
  photos: OntPhotoListItem[];
  onClose: () => void;
  onPhotosChange: (newPhotos: OntPhotoListItem[]) => void;
}

const OntGalleryModal = (
  {ontId, photos, onClose, onPhotosChange}: Props
) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'ontModal.galleryModal' });

  const [photosList, setPhotosList] = useState<OntPhotoListItem[] | null>(photos);

  const closeModal = () => {
    setPhotosList(null);
    onClose();
  };

  const onNewPhotosUpload = async (uploadedPhotos: FileList | never[]) => {
    const formData = new FormData();

    Array.from(uploadedPhotos).forEach((file: File) => {
      formData.append('files[]', file, file.name);
    });

    const result = await montageOntService.uploadPhotos(ontId, formData);

    if (result instanceof ServiceError) {
      return false;
    }

    const newPhotosList = [
      ...(photosList || []),
      ...result.items,
    ];
    setPhotosList(newPhotosList);

    onPhotosChange(newPhotosList);

    return true;
  }

  const onPhotoDelete = async (photoId: string) => {
    if (!photosList) {
      return false;
    }

    const deleteResponse = await montageOntService.deletePhoto(ontId, photoId);
    if (deleteResponse instanceof ServiceError) {
      return false;
    }

    const newPhotosList = photosList.filter(
      (photoItem) => photoItem.id !== photoId
    );
    setPhotosList(newPhotosList);
    onPhotosChange(newPhotosList);

    return true;
  }

  if (photosList === null) {
    return <LoadingSpinner />;
  }

  return (
    <GalleryModal
      modalTitle={t('title')}
      onClose={closeModal}
      photos={photosList}
      imageMaxSizeMb={JOB_IMAGE_MAX_SIZE_MB}
      allowedImageTypes={JOB_IMAGE_ALLOWED_TYPES}
      onImagesUpload={onNewPhotosUpload}
      onImageDelete={onPhotoDelete}
      t={t}
    />
  )
}

export default OntGalleryModal;