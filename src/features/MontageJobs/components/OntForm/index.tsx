import { Controller, useForm } from 'react-hook-form';
import React, { useCallback, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  DialogActions,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SignatureCanvas from 'react-signature-canvas';
import { formStyles } from 'features/MontageJobs/components/OntForm/styles';
import { actionButtonWrapperStyles } from 'features/MontageJobs/components/OntModal/styles';
import FormValidationSchema from 'features/MontageJobs/components/OntForm/validationSchema';
import CustomerSignature from 'features/MontageJobs/components/OntForm/CustomerSignature';
import {
  DetailsProps,
  EditableProps,
  Status,
} from 'features/MontageJobs/types/ont';
import { TYPES } from 'features/MontageJobs/constants/ont';

import SelectController from 'components/SelectController';

type Props = {
  onSubmit: (newData: EditableProps) => void;
  currentData?: DetailsProps | null;
  submitError: string | null;
  isLoading: boolean;
  closeModal: () => void;
};

const defaultFormValuesInitialState: EditableProps = {
  ontType: '',
  odfCode: '',
  odfPos: '',
  signature: '',
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
      signature: currentData.signature || '',
      ontInstalled: currentData.status === Status.INSTALLED,
      ontPreInstalled: currentData.status === Status.PREINSTALLED,
    };
  }

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(FormValidationSchema),
  });
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'ontModal' });

  const signatureCanvasRef = useRef<SignatureCanvas>(null);

  const onFormSubmit = useCallback(
    (data: EditableProps) => {
      const signatureCanvas = signatureCanvasRef!.current;

      onSubmit({
        ...data,
        signature: signatureCanvas!.isEmpty()
          ? ''
          : signatureCanvas!.toDataURL(),
      });
    },
    [onSubmit, signatureCanvasRef?.current],
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
            <TextField {...field} variant="outlined" fullWidth />
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
            <TextField {...field} variant="outlined" fullWidth />
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
                    setValue('ontInstalled', false, { shouldDirty: true });
                  }
                }}
              />
            }
            label={t('form.ontPreInstalled.label')}
          />
        )}
      />
      <SelectController
        name="ontType"
        control={control}
        options={TYPES.map((ontType) => ({
          value: ontType,
          label: t(`form.ontType.options.${ontType}`),
        }))}
        label={t('form.ontType.label')}
      />
      <CustomerSignature
        signature={currentData?.signature || ''}
        ref={signatureCanvasRef}
      />
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
                    setValue('ontPreInstalled', false, { shouldDirty: true });
                  }
                }}
              />
            }
            label={t('form.ontInstalled.label')}
          />
        )}
      />
      {submitError && <Alert severity="error">{submitError}</Alert>}
      <DialogActions>
        <Box sx={actionButtonWrapperStyles}>
          <Button variant="text" onClick={closeModal}>
            {t('form.closeBtn')}
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            loadingPosition="end"
          >
            {t('form.submitBtn')}
          </LoadingButton>
        </Box>
      </DialogActions>
    </Box>
  );
};

export default OntForm;
