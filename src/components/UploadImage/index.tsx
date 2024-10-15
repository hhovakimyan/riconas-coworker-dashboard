import React from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import type { TFunction } from 'i18next';

import { ImageTypes } from 'types/images';
import FileUploadButton from 'components/FileUploadButton';
import useImageUpload from 'hooks/image-upload';
import UploadFileErrorSnackbar from 'components/UploadFileErrorSnackbar';
import { photoImageButtonStyles } from 'components/UploadImage/styles';

type Props = {
  fileMaxSizeMb: number;
  allowedImageTypes: string[];
  resolutionWidth: number;
  resolutionHeight: number;
  onImageUpload: (uploadedFile: File, imageType: string) => Promise<boolean>;
  btnId: string;
  t: TFunction,
};

const UploadImage: React.FC<Props> = ({
  fileMaxSizeMb,
  allowedImageTypes,
  resolutionWidth,
  resolutionHeight,
  onImageUpload,
  btnId,
  t,
}) => {
  const { uploadError, onFileUpload, clearUploadError } =
    useImageUpload(
      fileMaxSizeMb,
      allowedImageTypes,
      resolutionWidth,
      resolutionHeight,
      onImageUpload,
      t,
    );

  return (
    <>
      <FileUploadButton
        icon={<AddAPhotoIcon />}
        accept={[ImageTypes.Png, ImageTypes.Jpeg].join(", ")}
        onUpload={onFileUpload}
        sx={photoImageButtonStyles}
        id={btnId}
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
