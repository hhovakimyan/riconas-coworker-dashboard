import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import { StyledCloseIconButton } from 'features/MontageJobs/components/HupModal/styles';
import DispatcherForm from 'features/MontageJobs/components/DispatcherModal/DispatcherForm';
import { dialogStyles } from 'features/MontageJobs/components/DispatcherModal/styles';
import { DispatcherFields, ApiListItem } from 'features/MontageJobs/types/jobs';

type Props = {
  jobData: ApiListItem;
  onClose: () => void;
  submitFormData: (data: DispatcherFields) => void;
};

const DispatcherModal: React.FC<Props> = ({ jobData, onClose }) => {
  const { t } = useTranslation('montage-jobs', {
    keyPrefix: 'dispatcherModal',
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const closeModal = () => {
    setIsLoading(false);
    setSubmitError(null);

    onClose();
  };

  const onSubmit = (data: DispatcherFields) => {
    setIsLoading(true);
    console.log(data);

    setIsLoading(false);
    closeModal();
  };

  return (
    <Dialog open fullWidth maxWidth="lg" sx={dialogStyles}>
      <DialogTitle>
        {t('title', {
          addressLine1: jobData.address_line1,
          addressLine2: jobData.address_line2,
        })}
        <StyledCloseIconButton aria-label="close" onClick={closeModal}>
          <Close />
        </StyledCloseIconButton>
      </DialogTitle>
      <DialogContent>
        <DispatcherForm
          onSubmit={onSubmit}
          submitError={submitError}
          onClose={closeModal}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DispatcherModal;
