import { ChangeEvent, useState } from 'react';
import type { TFunction } from 'i18next';

import {
  getUploadedImageResolution,
} from 'utils/uploaded-files';

const useImageUpload = (
  fileMaxSize: number,
  allowedImageTypes: string[],
  resolutionWidth: number,
  resolutionHeight: number,
  onImageUpload: (
    uploadedFile: File,
    imageType: string,
  ) => Promise<boolean>,
  t: TFunction,
) => {
  const [uploadError, setUploadError] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const clearUploadError = () => {
    setUploadError('');
  };

  const validateUploadedImage = async (
    uploadedFile: File,
  ): Promise<string | boolean> => {
    if (uploadedFile.size > fileMaxSize * 1000000) {
      return 'errors.fileSize';
    }

    if (!allowedImageTypes.includes(uploadedFile.type)) {
      return 'errors.fileFormat';
    }

    // Validate image resolution
    const [width, height] = await getUploadedImageResolution(uploadedFile);
    if (width < resolutionWidth || height < resolutionHeight) {
      return 'errors.resolution';
    }

    return true;
  };

  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const uploadedFile = event?.target?.files?.[0];
    if (!uploadedFile) {
      return;
    }

    const validationResult = await validateUploadedImage(uploadedFile);
    if (typeof validationResult === 'string') {
      setUploadError(
        t(validationResult, {
          maxSize: fileMaxSize,
          resolution: `${resolutionWidth}x${resolutionHeight}`,
        }),
      );
      setIsUploading(false);
      return;
    }

    const isUploaded = await onImageUpload(
      uploadedFile,
      uploadedFile.type,
    );
    setIsUploading(false);
    if (!isUploaded) {
      setUploadError(t('errors.uploadFailed'));
    }
  };

  return {
    isUploading,
    uploadError,
    onFileUpload,
    clearUploadError,
  };
};

export default useImageUpload;
