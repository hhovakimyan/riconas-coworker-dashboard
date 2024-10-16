import { Controller, useForm } from 'react-hook-form';
import React, { useCallback, useState } from 'react';
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

import SelectController from 'components/SelectController';
import HopFormValidationSchema from 'pages/HouseConnectionPage/MontageJobsList/components/HupForm/validationSchema';
import { HUP_LOCATIONS, HUP_TYPES } from 'constants/hup';
import { HupEditableProps } from 'types/hups';
import { formStyles } from 'pages/HouseConnectionPage/MontageJobsList/components/HupForm/styles';
import { actionButtonWrapperStyles } from 'pages/HouseConnectionPage/MontageJobsList/components/HupModal/styles';

type Props = {
  onSubmit: (newData: HupEditableProps, isDataChanged: boolean) => void;
  currentData?: HupEditableProps | null;
  submitError: string | null;
  isLoading: boolean;
  closeModal: () => void;
};

const defaultFormValuesInitialState: HupEditableProps = {
  openedHupPhoto: '',
  closedHupPhoto: '',
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
    resolver: yupResolver(HopFormValidationSchema),
  });
  const { t } = useTranslation('montage-jobs', {keyPrefix: 'hupModal.form'});

  const [openedHupPhotoFileName, setOpenedHupPhotoFileName] = useState<string>('');
  const [closedHupPhotoFileName, setClosedHupPhotoFileName] = useState<string>('');

  const onFormSubmit = useCallback(
    (data: HupEditableProps) => {
      onSubmit(
        {
          ...data,
          openedHupPhoto: openedHupPhotoFileName,
          closedHupPhoto: closedHupPhotoFileName
        },
        isDirty
      );
    },
    [onSubmit, isDirty, openedHupPhotoFileName, closedHupPhotoFileName],
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={formStyles}>
      <SelectController
        name='hupType'
        control={control}
        options={
          HUP_TYPES.map((hupType) => (
            { value: hupType, label: t(`hupType.options.${hupType}`) }
          ))
        }
        label={t('hupType.label')}
      />
      <SelectController
        name='hupLocation'
        control={control}
        options={
          HUP_LOCATIONS.map((hupLocation) => (
            { value: hupLocation, label: t(`hupLocation.options.${hupLocation}`) }
          ))
        }
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
                  setValue('hupInstalled', false, {shouldDirty: true});
                }
              }}
            />}
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
                    setValue('hupPreInstalled', false, {shouldDirty: true});
                  }
                }}
              />}
           label={t('hupInstalled.label')}
         />
       )}
      />
      {submitError && (
        <Alert severity="error">{submitError}</Alert>
      )}
      <DialogActions>
        <Box sx={actionButtonWrapperStyles}>
          <Button variant="text" onClick={closeModal}>{t('closeBtn')}</Button>
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            loadingPosition='end'
          >
            {t('submitBtn')}
          </LoadingButton>
        </Box>
      </DialogActions>
    </Box>
  );
};

export default HupForm;
