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
  Switch, TextField, Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import SelectController from 'components/SelectController';
import { ONT_TYPES } from 'constants/hup';
import { formStyles } from 'pages/HouseConnectionPage/MontageJobsList/components/OntForm/styles';
import { actionButtonWrapperStyles } from 'pages/HouseConnectionPage/MontageJobsList/components/OntModal/styles';
import { OntDetailsProps, OntEditableProps, OntStatus } from 'types/ont';
import OntFormValidationSchema from 'pages/HouseConnectionPage/MontageJobsList/components/OntForm/validationSchema';
import CoworkerSignature from 'pages/HouseConnectionPage/MontageJobsList/components/OntForm/CoworkerSignature';

type Props = {
  onSubmit: (newData: OntEditableProps, isDataChanged: boolean) => void;
  currentData?: OntDetailsProps | null;
  submitError: string | null;
  isLoading: boolean;
  closeModal: () => void;
};

const defaultFormValuesInitialState: OntEditableProps = {
  ontType: '',
  odfCode: '',
  odfPos: '',
  ontPreInstalled: false,
  ontInstalled: false,
};

const OntForm: React.FC<Props> = ({
  onSubmit,
  submitError,
  currentData,
  isLoading,
  closeModal,
}) => {
  let defaultFormValues = defaultFormValuesInitialState;
  if (currentData) {
    defaultFormValues = {
      ontType: currentData.type || undefined,
      odfCode: currentData.odf_code || undefined,
      odfPos: currentData.odf_pos || undefined,
      ontInstalled: currentData.status === OntStatus.INSTALLED,
      ontPreInstalled: currentData.status === OntStatus.PREINSTALLED,
    };
  }

  const {
    handleSubmit,
    formState: { isDirty },
    control,
    setValue,
  } = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(OntFormValidationSchema),
  });
  const { t } = useTranslation('montage-jobs', {keyPrefix: 'ontModal'});

  const [signature, setSignature] = useState<string | null>(null);

  const onFormSubmit = useCallback(
    (data: OntEditableProps) => {
      onSubmit(data, isDirty);
    },
    [onSubmit, isDirty],
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={formStyles}>
      <Box>
        <Typography fontWeight="bold">{t('splitterCode')}</Typography>
        <Typography>{currentData?.splitter_code}</Typography>
      </Box>
      <Box>
        <Typography fontWeight="bold">{t('splitterFiber')}</Typography>
        <Typography>{currentData?.splitter_fiber}</Typography>
      </Box>
      <Box>
        <Typography fontWeight="bold">{t('odfCodePlanned')}</Typography>
        <Typography>{currentData?.odf_code_planned}</Typography>
      </Box>
      <Box>
        <Typography fontWeight="bold">{t('form.odfCode.label')}</Typography>
        <Controller
          name="odfCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>
      <Box>
        <Typography fontWeight="bold">{t('odfPosPlanned')}</Typography>
        <Typography>{currentData?.odf_pos_planned}</Typography>
      </Box>
      <Box>
        <Typography fontWeight="bold">{t('form.odfPos.label')}</Typography>
        <Controller
          name="odfPos"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>
      <Controller
        name="ontPreInstalled"
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
                    setValue('ontInstalled', false, {shouldDirty: true});
                  }
                }}
              />}
            label={t('form.ontPreInstalled.label')}
          />
        )}
      />
      <SelectController
        name='ontType'
        control={control}
        options={
          ONT_TYPES.map((ontType) => (
            { value: ontType, label: t(`form.ontType.options.${ontType}`) }
          ))
        }
        label={t('form.ontType.label')}
      />
      <CoworkerSignature signature={signature} setSignature={setSignature} />
      <Controller
       name="ontInstalled"
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
                    setValue('ontPreInstalled', false, {shouldDirty: true});
                  }
                }}
              />}
           label={t('form.ontInstalled.label')}
         />
       )}
      />
      {submitError && (
        <Alert severity="error">{submitError}</Alert>
      )}
      <DialogActions>
        <Box sx={actionButtonWrapperStyles}>
          <Button variant="text" onClick={closeModal}>{t('form.closeBtn')}</Button>
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            loadingPosition='end'
          >
            {t('form.submitBtn')}
          </LoadingButton>
        </Box>
      </DialogActions>
    </Box>
  );
};

export default OntForm;
