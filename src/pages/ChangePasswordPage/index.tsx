import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PageTitle from 'components/PageTitle';
import { pageStyles } from 'pages/ChangePasswordPage/styles';
import ChangePasswordForm from 'pages/ChangePasswordPage/ChangePasswordForm';

const ChangePasswordPage = () => {
  const { t } = useTranslation('change-password');

  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);

  const onSubmit = () => {
    setIsPasswordChanged(true);
  };

  return (
    <Container maxWidth="sm" sx={pageStyles}>
      <Box className="innerContent">
        <PageTitle className="title">{t('title')}</PageTitle>
        {
          isPasswordChanged ?
            <Typography>
              {t('passwordChangedMessage')}
            </Typography> :
            <ChangePasswordForm onSubmit={onSubmit} />
        }
      </Box>
    </Container>
  )
}

export default ChangePasswordPage;