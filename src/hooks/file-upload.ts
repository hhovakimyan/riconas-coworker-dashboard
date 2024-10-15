import { ChangeEvent, useState } from 'react';
import type { TFunction } from 'i18next';

const useFileUpload = (
  fileMaxSize: number,
  allowedFileTypes: string[],
  onFileUploadToServer: (
    uploadedFile: File,
    fileType: string,
  ) => Promise<boolean>,
  t: TFunction,
) => {
  const [uploadError, setUploadError] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const clearUploadError = () => {
    setUploadError('');
  };

  const validateUploadedFile = async (
    uploadedFile: File,
  ): Promise<string | boolean> => {
    if (uploadedFile.size > fileMaxSize * 1000000) {
      return 'errors.fileSize';
    }

    if (!allowedFileTypes.includes(uploadedFile.type)) {
      return 'errors.fileFormat';
    }

    return true;
  };

  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const uploadedFile = event?.target?.files?.[0];
    if (!uploadedFile) {
      return;
    }

    const validationResult = await validateUploadedFile(uploadedFile);
    if (typeof validationResult === 'string') {
      setUploadError(
        t(
          validationResult,
          {
            maxSize: fileMaxSize,
          }
        ),
      );
      setIsUploading(false);
      return;
    }

    const isUploaded = await onFileUploadToServer(
      uploadedFile,
      uploadedFile.type
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

export default useFileUpload;
