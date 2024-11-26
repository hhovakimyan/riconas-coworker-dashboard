import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { formStyles } from 'features/MontageJobs/components/HupForm/styles';
import { actionButtonWrapperStyles } from 'features/MontageJobs/components/HupModal/styles';
import { DispatcherFields } from 'features/MontageJobs/types/jobs';
import { JOB_STATUSES } from 'features/MontageJobs/constants/table';

import SelectController from 'components/SelectController';

type Props = {
  onSubmit: (data: DispatcherFields) => void;
  submitError: string | null;
  isLoading: boolean;
  onClose: () => void;
};

const defaultFormValuesInitialState: DispatcherFields = {
  jobStatus: '',
  note: '',
};

const DispatcherForm: React.FC<Props> = ({
  onSubmit,
  submitError,
  isLoading,
  onClose,
}) => {
  const { t } = useTranslation('montage-jobs', {
    keyPrefix: 'dispatcherModal.form',
  });

  const { handleSubmit, control } = useForm({
    defaultValues: defaultFormValuesInitialState,
  });

  const onFormSubmit = useCallback(
    (data: DispatcherFields) => {
      onSubmit(data);
    },
    [onSubmit],
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={formStyles}>
      <Box>
        <Typography fontWeight="bold">{t('jobStatus.label')}</Typography>
        <SelectController
          name="jobStatus"
          control={control}
          options={JOB_STATUSES.map((jobStatus) => ({
            value: jobStatus,
            label: t(`jobStatus.options.${jobStatus}`),
          }))}
          label={t('jobStatus.label')}
          styles={{ width: '100%' }}
        />
      </Box>
      <Box>
        <Typography fontWeight="bold">{t('note.label')}</Typography>
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <TextField {...field} variant="outlined" fullWidth />
          )}
        />
      </Box>
      {submitError && <Alert severity="error">{submitError}</Alert>}
      <DialogActions
        sx={{ position: 'absolute', bottom: '10px', right: '20px' }}
      >
        <Box sx={actionButtonWrapperStyles}>
          <Button variant="text" onClick={onClose}>
            {t('closeBtn')}
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            loadingPosition="end"
          >
            {t('submitBtn')}
          </LoadingButton>
        </Box>
      </DialogActions>
    </Box>
  );
};

export default DispatcherForm;
