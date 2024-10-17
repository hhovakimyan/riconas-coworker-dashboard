import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import GalleryModal from 'components/GalleryModal';
import { JobPhotoListItem } from 'types/montage-jobs';
import { FetchJobPhotosListResponseDto } from 'services/models/MontageJobs';
import { montageJobService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import { JOB_IMAGE_ALLOWED_TYPES, JOB_IMAGE_MAX_SIZE_MB } from 'constants/montageJobs';

type Props = {
  jobId: string;
  onClose: () => void;
}

const JobGalleryModal = ({jobId, onClose}: Props) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'galleryModal' });

  const [photosList, setPhotosList] = useState<JobPhotoListItem[] | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    montageJobService
      .fetchPhotosList(jobId)
      .then((response: FetchJobPhotosListResponseDto) => {
        setPhotosList(response.items);
      })
  }, []);

  const closeModal = () => {
    setPhotosList(null);
    setSubmitError(null);
    onClose();
  };

  const onNewPhotosUpload = async (uploadedPhotos: FileList | never[]) => {
    setSubmitError(null);
    setIsLoading(true);
    console.log(uploadedPhotos);

    return true;
  }

  const onPhotoDelete = async (photoId: string) => {
    if (!photosList) {
      return false;
    }

    const newPhotosList = photosList.filter(
      (photoItem) => photoItem.id !== photoId
    );
    setPhotosList(newPhotosList);

    return true;
  }

  if (photosList === null) {
    return <LoadingSpinner />
  }

  return (
    <GalleryModal
      modalTitle={t('title')}
      onClose={closeModal}
      photos={photosList}
      imageUploadBtnTitle={t('uploadImageBtnTitle')}
      imageMaxSizeMb={JOB_IMAGE_MAX_SIZE_MB}
      allowedImageTypes={JOB_IMAGE_ALLOWED_TYPES}
      onImagesUpload={onNewPhotosUpload}
      onImageDelete={onPhotoDelete}
      t={t}
    />
  )
}

export default JobGalleryModal;