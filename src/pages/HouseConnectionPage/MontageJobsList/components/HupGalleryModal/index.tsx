import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import GalleryModal from 'components/GalleryModal';
import { hupService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import { JOB_IMAGE_ALLOWED_TYPES, JOB_IMAGE_MAX_SIZE_MB } from 'constants/montageJobs';
import { ServiceError } from 'services/helperTypes';
import { HupPhotoListItem, HupPhotoState } from 'types/hups';

type Props = {
  jobId: string;
  photos: HupPhotoListItem[];
  onClose: () => void;
  state: HupPhotoState;
  onPhotosChange: (newPhotos: HupPhotoListItem[]) => void;
}

const HupGalleryModal = (
  {jobId, photos, state, onClose, onPhotosChange}: Props
) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'hupModal.galleryModal' });

  const [photosList, setPhotosList] = useState<HupPhotoListItem[] | null>(photos);

  const closeModal = () => {
    setPhotosList(null);
    onClose();
  };

  const onNewPhotosUpload = async (uploadedPhotos: FileList | never[]) => {
    const formData = new FormData();

    formData.append('state', state);
    Array.from(uploadedPhotos).forEach((file: File) => {
      formData.append('files[]', file, file.name);
    });

    const result = await hupService.uploadPhotos(jobId, formData);

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

    const deleteResponse = await hupService.deletePhoto(jobId, photoId);
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

export default HupGalleryModal;