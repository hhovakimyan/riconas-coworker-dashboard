import React from 'react';
import type { TFunction } from 'i18next';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import FileUploadButton from 'components/FileUploadButton';
import UploadFileErrorSnackbar from 'components/UploadFileErrorSnackbar';
import useFileUpload from 'hooks/file-upload';

type Props = {
  fileMaxSizeMb: number;
  allowedFileTypes: string[];
  acceptedFileTypes: string[];
  onFileUploadToServer: (uploadedFile: File, fileType: string) => Promise<boolean>;
  btnId: string;
  t: TFunction,
  multiple?: boolean;
};

const UploadFile: React.FC<Props> = ({
  fileMaxSizeMb,
  allowedFileTypes,
  acceptedFileTypes,
  onFileUploadToServer,
  btnId,
  t,
  multiple = false,
}) => {
  const { uploadError, onFileUpload, clearUploadError } =
    useFileUpload(
      fileMaxSizeMb,
      allowedFileTypes,
      onFileUploadToServer,
      t,
    );

  return (
    <>
      <FileUploadButton
        accept={acceptedFileTypes.join(',')}
        icon={<AttachFileIcon />}
        onUpload={onFileUpload}
        id={btnId}
        title={t('title')}
        multiple={multiple}
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

export default UploadFile;
