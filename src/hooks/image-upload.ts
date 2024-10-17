import { ChangeEvent, useState } from 'react';
import type { TFunction } from 'i18next';

const useImageUpload = (
  fileMaxSize: number,
  allowedImageTypes: string[],
  onImageUpload: (
    uploadedFiles: FileList | never[]
  ) => Promise<boolean>,
  t: TFunction,
) => {
  const [uploadError, setUploadError] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const clearUploadError = () => {
    setUploadError('');
  };

  const validateUploadedImage = (
    uploadedFiles: FileList | never[],
  ): boolean => {
    Array.from(uploadedFiles).forEach((uploadedFile) => {
      if (uploadedFile.size > fileMaxSize * 1000000) {
        throw new Error('errors.fileSize');
      }

      if (!allowedImageTypes.includes(uploadedFile.type)) {
        throw new Error('errors.fileFormat');
      }
    });

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
      setUploadError(
        t(error.message, {
          maxSize: fileMaxSize,
        }),
      );
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
