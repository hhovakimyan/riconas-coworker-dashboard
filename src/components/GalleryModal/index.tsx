import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar, Link,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { TFunction } from 'i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import {
  dialogStyles,
  imagesListStyles,
  noImagesTextStyles,
  StyledCloseIconButton,
} from 'components/GalleryModal/styles';
import UploadImage from 'components/UploadImage';
import DeleteImageConfirmationModal from 'components/GalleryModal/DeleteImageConfirmationModal';
import { downloadFile } from 'utils/download-files';

type Props = {
  modalTitle: string;
  onClose: () => void;
  photos: { id: string, path: string }[];
  imageUploadBtnTitle: string;
  imageMaxSizeMb: number;
  allowedImageTypes: string[];
  onImagesUpload: (uploadedImages: FileList | never[]) => Promise<boolean>;
  onImageDelete: (imageId: string) => Promise<boolean>;
  t: TFunction;
};

enum ModalActions {
  openDeleteConfirmModal = 'openDeleteConfirmModal',
}

const GalleryModal = ({
  modalTitle,
  onClose,
  photos,
  imageUploadBtnTitle,
  imageMaxSizeMb,
  allowedImageTypes,
  onImagesUpload,
  onImageDelete,
  t
}: Props
) => {
  const { t: mainT } = useTranslation('main', { keyPrefix: 'galleryModal' });

  const [modalAction, setModalAction] = useState<ModalActions | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const onDelete = (imageId: string) => {
    setModalAction(ModalActions.openDeleteConfirmModal);
    setSelectedImageId(imageId);
  }

  const onDeleteModalClose = () => {
    setModalAction(null);
    setSelectedImageId(null);
  }

  return (
    <>
      <Dialog open fullWidth maxWidth="lg" sx={dialogStyles}>
        <DialogTitle>
          {modalTitle}
          <StyledCloseIconButton
            aria-label="close"
            onClick={onClose}
          >
            <Close />
          </StyledCloseIconButton>
        </DialogTitle>
        <DialogContent>
          <ImageList sx={imagesListStyles} cols={photos.length === 0 ? 1 : 3} rowHeight={164}>
            {photos.map((photo, index) => (
              <ImageListItem key={`photo-${photo.id}`}>
                <img
                  src={photo.path}
                  alt={`Gallery photo ${index}`}
                  loading="lazy"
                />
                <ImageListItemBar
                  position="top"
                  actionIcon={
                    <>
                      <Link
                        // href={photo.path}
                        // download='image.jpg'
                        component="button"
                        onClick={() => {
                          downloadFile(photo.path);
                        }}
                        title={mainT('downloadImage')}
                      >
                        <DownloadIcon />
                      </Link>
                      <IconButton
                        title={mainT('deleteImage')}
                        onClick={() => {
                          onDelete(photo.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                />
              </ImageListItem>
            ))}
            {
              photos.length === 0 &&
              <Typography sx={noImagesTextStyles} component="h2">
                {mainT('noImages')}
              </Typography>
            }
          </ImageList>
          <UploadImage
            fileMaxSizeMb={imageMaxSizeMb}
            allowedImageTypes={allowedImageTypes}
            onImageUpload={onImagesUpload}
            title={imageUploadBtnTitle}
            btnId="uploadNewImages"
            t={t}
            multiple
          />
        </DialogContent>
      </Dialog>
      {
        modalAction === ModalActions.openDeleteConfirmModal &&
        selectedImageId &&
        <DeleteImageConfirmationModal
          imageId={selectedImageId}
          onClose={onDeleteModalClose}
          onDelete={onImageDelete}
        />
      }
    </>
  )
}

export default GalleryModal