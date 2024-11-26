import { Controller, useForm } from 'react-hook-form';
import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  DialogActions,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormValidationSchema from 'features/MontageJobs/components/HupForm/validationSchema';
import { formStyles } from 'features/MontageJobs/components/HupForm/styles';
import { actionButtonWrapperStyles } from 'features/MontageJobs/components/HupModal/styles';
import { EditableProps } from 'features/MontageJobs/types/hups';
import { LOCATIONS, TYPES } from 'features/MontageJobs/constants/hup';

import SelectController from 'components/SelectController';

type Props = {
  onSubmit: (newData: EditableProps, isDataChanged: boolean) => void;
  currentData?: EditableProps | null;
  submitError: string | null;
  isLoading: boolean;
  closeModal: () => void;
};

const defaultFormValuesInitialState: EditableProps = {
  hupType: '',
  hupLocation: '',
  hupPreInstalled: false,
  hupInstalled: false,
};

const HupForm: React.FC<Props> = ({
  onSubmit,
  submitError,
  currentData,
  isLoading,
  closeModal,
}) => {
  let defaultFormValues = defaultFormValuesInitialState;
  if (currentData) {
    defaultFormValues = currentData;
  }

  const {
    handleSubmit,
    formState: { isDirty },
    control,
    setValue,
  } = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(FormValidationSchema),
  });
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'hupModal.form' });

  const onFormSubmit = useCallback(
    (data: EditableProps) => {
      onSubmit(data, isDirty);
    },
    [onSubmit, isDirty],
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={formStyles}>
      <SelectController
        name="hupType"
        control={control}
        options={TYPES.map((hupType) => ({
          value: hupType,
          label: t(`hupType.options.${hupType}`),
        }))}
        label={t('hupType.label')}
      />
      <SelectController
        name="hupLocation"
        control={control}
        options={LOCATIONS.map((hupLocation) => ({
          value: hupLocation,
          label: t(`hupLocation.options.${hupLocation}`),
        }))}
        label={t('hupLocation.label')}
      />
      <Controller
        name="hupPreInstalled"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(event);

                  if (event.target.checked) {
                    setValue('hupInstalled', false, { shouldDirty: true });
                  }
                }}
              />
            }
            label={t('hupPreInstalled.label')}
          />
        )}
      />
      <Controller
        name="hupInstalled"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(event);

                  if (event.target.checked) {
                    setValue('hupPreInstalled', false, { shouldDirty: true });
                  }
                }}
              />
            }
            label={t('hupInstalled.label')}
          />
        )}
      />
      {submitError && <Alert severity="error">{submitError}</Alert>}
      <DialogActions>
        <Box sx={actionButtonWrapperStyles}>
          <Button variant="text" onClick={closeModal}>
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

export default HupForm;
