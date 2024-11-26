import { Box, Button, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import React, { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ontPhotosList } from 'features/MontageJobs/components/OntModal/styles';
import OntGalleryModal from 'features/MontageJobs/components/OntGalleryModal';
import { PhotoListItem } from 'features/MontageJobs/types/ont';

type Props = {
  jobId: string;
  photos: PhotoListItem[];
  setPhotos: React.Dispatch<SetStateAction<PhotoListItem[]>>;
};

const OntPhotos: React.FC<Props> = ({ jobId, photos, setPhotos }) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'ontModal' });

  const [galleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);

  const onPhotosBtnClick = () => {
    setGalleryModalOpen(true);
  };

  const onGalleryModalClose = () => {
    setGalleryModalOpen(false);
  };

  return (
    <>
      <Box sx={ontPhotosList}>
        <Box>
          <Typography>{t('photos')}</Typography>
          <Button
            variant="outlined"
            color="info"
            startIcon={<CollectionsIcon />}
            onClick={onPhotosBtnClick}
          >
            ({photos.length})
          </Button>
        </Box>
      </Box>
      {galleryModalOpen && (
        <OntGalleryModal
          ontId={jobId}
          photos={photos}
          onClose={onGalleryModalClose}
          onPhotosChange={(newPhotosList) => {
            setPhotos(newPhotosList);
          }}
        />
      )}
    </>
  );
};

export default OntPhotos;
