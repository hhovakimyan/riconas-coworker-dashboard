import { Box, Button, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import React, { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { hupPhotosList } from 'features/MontageJobs/components/HupModal/styles';
import HupGalleryModal from 'features/MontageJobs/components/HupGalleryModal';
import { PhotoListItem, PhotoState } from 'features/MontageJobs/types/hups';

type Props = {
  jobId: string;
  openedStatePhotos: PhotoListItem[];
  setOpenedStatePhotos: React.Dispatch<SetStateAction<PhotoListItem[]>>;
  closedStatePhotos: PhotoListItem[];
  setClosedStatePhotos: React.Dispatch<SetStateAction<PhotoListItem[]>>;
};

const HupPhotos: React.FC<Props> = ({
  jobId,
  openedStatePhotos,
  setOpenedStatePhotos,
  closedStatePhotos,
  setClosedStatePhotos,
}) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'hupModal' });

  const [galleryModalState, setGalleryModalState] = useState<PhotoState | null>(
    null,
  );

  const onOpenedPhotosBtnClick = () => {
    setGalleryModalState(PhotoState.OPENED);
  };

  const onClosedPhotosBtnClick = () => {
    setGalleryModalState(PhotoState.CLOSED);
  };

  const onGalleryModalClose = () => {
    setGalleryModalState(null);
  };

  return (
    <>
      <Box sx={hupPhotosList}>
        <Box>
          <Typography>{t('openedPhotos')}</Typography>
          <Button
            variant="outlined"
            color="info"
            startIcon={<CollectionsIcon />}
            onClick={onOpenedPhotosBtnClick}
          >
            ({openedStatePhotos.length})
          </Button>
        </Box>
        <Box>
          <Typography>{t('closedPhotos')}</Typography>
          <Button
            variant="outlined"
            color="info"
            startIcon={<CollectionsIcon />}
            onClick={onClosedPhotosBtnClick}
          >
            ({closedStatePhotos.length})
          </Button>
        </Box>
      </Box>
      {galleryModalState !== null && (
        <HupGalleryModal
          jobId={jobId}
          photos={
            galleryModalState === PhotoState.OPENED
              ? openedStatePhotos
              : closedStatePhotos
          }
          onClose={onGalleryModalClose}
          state={galleryModalState}
          onPhotosChange={(newPhotosList) => {
            if (galleryModalState === PhotoState.OPENED) {
              setOpenedStatePhotos(newPhotosList);
            } else {
              setClosedStatePhotos(newPhotosList);
            }
          }}
        />
      )}
    </>
  );
};

export default HupPhotos;
