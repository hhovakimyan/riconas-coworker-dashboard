import React, { useState } from 'react';
import { Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ConfirmationDialog from 'components/ConfirmationDialog';
import { useSnackbarContext } from 'providers/Snackbar';

type Props = {
  imageId: string;
  onClose: (isDeleted?: boolean) => void;
  onDelete: (imageId: string) => Promise<boolean>;
};

const DeleteImageConfirmationModal: React.FC<Props> = ({
  imageId,
  onClose,
  onDelete,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t: mainT } = useTranslation('main', {
    keyPrefix: 'galleryModal.imageDeleteConfirmationModal',
  });
  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const onSubmit = async () => {
    setIsLoading(true);

    const isDeleted = await onDelete(imageId);
    setIsLoading(false);

    if (isDeleted) {
      setSnackbarMessage(
        <Alert severity="success">{mainT('successMessage')}</Alert>,
      );
    } else {
      setSnackbarMessage(
        <Alert severity="error">{mainT('failureMessage')}</Alert>,
      );
    }

    setSnackbarOpen(true);
    onClose(isDeleted);
  };

  return (
    <ConfirmationDialog
      title={mainT('title')}
      cancelBtnProps={{
        text: mainT('cancelText'),
        variant: 'text',
      }}
      confirmText={mainT('confirmText')}
      content={<Typography>{mainT('content')}</Typography>}
      onSubmit={onSubmit}
      onClose={onClose}
      isLoading={isLoading}
    />
  );
};

export default DeleteImageConfirmationModal;
