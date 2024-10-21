import { ChangeEvent, useState } from 'react';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { TOTAL_UPLOADED_FILES_MAX_SIZE } from 'constants/main';

const useImageUpload = (
  fileMaxSize: number,
  allowedImageTypes: string[],
  onImageUpload: (
    uploadedFiles: FileList | never[]
  ) => Promise<boolean>,
  t: TFunction,
) => {
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });

  const [uploadError, setUploadError] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const clearUploadError = () => {
    setUploadError('');
  };

  const validateUploadedImage = (
    uploadedFiles: FileList | never[],
  ): boolean => {
    let totalFileSize = 0;
    Array.from(uploadedFiles).forEach((uploadedFile) => {
      if (uploadedFile.size > fileMaxSize * 1000000) {
        throw new Error('errors.fileSize');
      }

      if (!allowedImageTypes.includes(uploadedFile.type)) {
        throw new Error('errors.fileFormat');
      }

      totalFileSize += uploadedFile.size;
    });

    if (totalFileSize > TOTAL_UPLOADED_FILES_MAX_SIZE * 1000000) {
      throw new Error('errors.totalFileSize');
    }

    return true;
  };

  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const uploadedFiles = event?.target?.files || [];
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return;
    }

    try {
      validateUploadedImage(uploadedFiles);
    } catch (error: any) {
      if (error.message === "errors.totalFileSize") {
        setUploadError(
          mainT("totalFileSize", { max: TOTAL_UPLOADED_FILES_MAX_SIZE })
        );
      } else {
        setUploadError(
          t(error.message, {
            maxSize: fileMaxSize,
          }),
        );
      }

      setIsUploading(false);
      return;
    }

    const isUploaded = await onImageUpload(uploadedFiles);
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
