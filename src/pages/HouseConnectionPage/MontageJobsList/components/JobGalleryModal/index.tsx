import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import GalleryModal from 'components/GalleryModal';
import { JobPhotoListItem } from 'types/montage-jobs';
import { FetchJobPhotosListResponseDto } from 'services/models/MontageJobs';
import { montageJobService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import { JOB_IMAGE_ALLOWED_TYPES, JOB_IMAGE_MAX_SIZE_MB } from 'constants/montageJobs';
import { ServiceError } from 'services/helperTypes';

type Props = {
  jobId: string;
  onClose: () => void;
}

const JobGalleryModal = ({jobId, onClose}: Props) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'galleryModal' });

  const [photosList, setPhotosList] = useState<JobPhotoListItem[] | null>(null);

  useEffect(() => {
    montageJobService
      .fetchPhotosList(jobId)
      .then((response: FetchJobPhotosListResponseDto) => {
        if (response.items) {
          setPhotosList(response.items);
        }
      })
  }, []);

  const closeModal = () => {
    setPhotosList(null);
    onClose();
  };

  const onNewPhotosUpload = async (uploadedPhotos: FileList | never[]) => {
    const formData = new FormData();

    Array.from(uploadedPhotos).forEach((file: File) => {
      formData.append('files[]', file, file.name);
    });

    const result = await montageJobService.uploadPhotos(jobId, formData);

    if (result instanceof ServiceError) {
      return false;
    }

    const newPhotosList = [
      ...(photosList || []),
      ...result.items,
    ];
    setPhotosList(newPhotosList);

    return true;
  }

  const onPhotoDelete = async (photoId: string) => {
    if (!photosList) {
      return false;
    }

    const deleteResponse = await montageJobService.deletePhoto(jobId, photoId);
    if (deleteResponse instanceof ServiceError) {
      return false;
    }

    const newPhotosList = photosList.filter(
      (photoItem) => photoItem.id !== photoId
    );
    setPhotosList(newPhotosList);

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

export default JobGalleryModal;