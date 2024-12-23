import { Alert, Box, TextField } from '@mui/material';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

import { formStyles } from 'pages/Login/components/LoginForm/styles';
import FormValidationSchema from 'pages/Login/components/LoginForm/validationSchema';
import { authenticationService } from 'services';
import { ServiceError } from 'services/helperTypes';

const defaultFormValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    defaultValues: defaultFormValues,
  });
  const { t } = useTranslation('login', { keyPrefix: 'form' });
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });
  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const signInResponse = await authenticationService.signIn({
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (signInResponse instanceof ServiceError) {
      const errorCode = signInResponse.composedError.code;
      switch (errorCode) {
        case 'unauthenticated':
          setServerError(t('errors.incorrect_credentials'));
          break;
        default:
          setServerError(mainT('somethingWentWrong'));
          break;
      }
    } else {
      // Success, redirect to homepage
      navigate('/');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onFormSubmit)}
      autoComplete="off"
      sx={formStyles}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('email.label')}
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors?.email?.message ? t(errors.email.message) : ''}
          />
        )}
      />
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

export default LoginForm;
