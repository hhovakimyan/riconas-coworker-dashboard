import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Alert, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { authenticationService } from 'services';
import { ServiceError } from 'services/helperTypes';
import FormValidationSchema from 'pages/AcceptInvitation/SetPasswordForm/validationSchema';
import { formStyles } from 'pages/AcceptInvitation/SetPasswordForm/styles';

type Props = {
  acceptInvitationCode: string;
  onSubmit: () => void;
};

const defaultFormValues = {
  password: '',
  confirmPassword: '',
};

const SetPasswordForm = ({ acceptInvitationCode, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    defaultValues: defaultFormValues,
  });
  const { t } = useTranslation('accept-invitation', { keyPrefix: 'form' });
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });
  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const acceptInvitationResponse =
      await authenticationService.acceptInvitation({
        code: acceptInvitationCode,
        password: data.password,
      });

    setIsLoading(false);

    if (acceptInvitationResponse instanceof ServiceError) {
      setServerError(mainT('somethingWentWrong'));
    } else {
      // Success response
      onSubmit();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onFormSubmit)}
      sx={formStyles}
      autoComplete="off"
    >
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('password.label')}
            variant="outlined"
            fullWidth
            type="password"
            error={!!errors.password}
            helperText={
              errors?.password?.message ? t(errors.password.message) : ''
            }
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('confirmPassword.label')}
            variant="outlined"
            fullWidth
            type="password"
            error={!!errors.confirmPassword}
            helperText={
              errors?.confirmPassword?.message
                ? t(errors.confirmPassword.message)
                : ''
            }
          />
        )}
      />
      {serverError && <Alert severity="error">{serverError}</Alert>}
      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        loading={isLoading}
        disabled={isLoading}
        loadingPosition={'end'}
      >
        {t('submitBtnTitle')}
      </LoadingButton>
    </Box>
  );
};

export default SetPasswordForm;
