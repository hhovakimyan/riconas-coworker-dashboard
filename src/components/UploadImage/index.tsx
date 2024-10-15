import React from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import type { TFunction } from 'i18next';

import { ImageTypes } from 'types/images';
import FileUploadButton from 'components/FileUploadButton';
import useImageUpload from 'hooks/image-upload';
import UploadFileErrorSnackbar from 'components/UploadFileErrorSnackbar';

type Props = {
  fileMaxSizeMb: number;
  allowedImageTypes: string[];
  onImageUpload: (uploadedFile: File, imageType: string) => Promise<boolean>;
  btnId: string;
  t: TFunction,
  sx?: Record<string, unknown>;
};

const UploadImage: React.FC<Props> = ({
  fileMaxSizeMb,
  allowedImageTypes,
  onImageUpload,
  btnId,
  t,
  sx,
}) => {
  const { uploadError, onFileUpload, clearUploadError } =
    useImageUpload(
      fileMaxSizeMb,
      allowedImageTypes,
      onImageUpload,
      t,
    );

  return (
    <>
      <FileUploadButton
        icon={<AddAPhotoIcon />}
        accept={[ImageTypes.Png, ImageTypes.Jpeg].join(", ")}
        onUpload={onFileUpload}
        id={btnId}
        title={t('title')}
        sx={sx}
      />
      {uploadError && (
        <UploadFileErrorSnackbar
          error={uploadError}
          handleClose={clearUploadError}
        />
      )}
    </>
  );
};

export default UploadImage;
