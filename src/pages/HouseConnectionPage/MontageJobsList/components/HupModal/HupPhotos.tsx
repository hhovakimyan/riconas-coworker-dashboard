import { Box, Button, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import React, { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HupPhotoListItem, HupPhotoState } from 'types/hups';
import { hupPhotosList } from 'pages/HouseConnectionPage/MontageJobsList/components/HupModal/styles';
import HupGalleryModal from 'pages/HouseConnectionPage/MontageJobsList/components/HupGalleryModal';

type Props = {
  jobId: string;
  openedStatePhotos: HupPhotoListItem[],
  setOpenedStatePhotos: React.Dispatch<SetStateAction<HupPhotoListItem[]>>,
  closedStatePhotos: HupPhotoListItem[],
  setClosedStatePhotos: React.Dispatch<SetStateAction<HupPhotoListItem[]>>,
}

const HupPhotos: React.FC<Props> = (
  {
    jobId,
    openedStatePhotos,
    setOpenedStatePhotos,
    closedStatePhotos,
    setClosedStatePhotos
  }
) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'hupModal' });

  const [galleryModalState, setGalleryModalState] = useState<HupPhotoState | null>(null);

  const onOpenedPhotosBtnClick = () => {
    setGalleryModalState(HupPhotoState.OPENED);
  }

  const onClosedPhotosBtnClick = () => {
    setGalleryModalState(HupPhotoState.CLOSED);
  }

  const onGalleryModalClose = () => {
    setGalleryModalState(null);
  }

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
      {
        galleryModalState !== null &&
        <HupGalleryModal
          jobId={jobId}
          photos={
            galleryModalState === HupPhotoState.OPENED ?
              openedStatePhotos :
              closedStatePhotos
          }
          onClose={onGalleryModalClose}
          state={galleryModalState}
          onPhotosChange={(newPhotosList) => {
            if (galleryModalState === HupPhotoState.OPENED) {
              setOpenedStatePhotos(newPhotosList);
            } else {
              setClosedStatePhotos(newPhotosList);
            }
          }}
        />
      }
    </>
  )
}

export default HupPhotos;