import { Container, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

import LoginForm from 'pages/Login/components/LoginForm';
import PageTitle from 'components/PageTitle';
import { pageStyles } from 'pages/Login/styles';

const Login = () => {
  const { t } = useTranslation('login');

  return (
    <Container maxWidth="sm" sx={pageStyles}>
      <PageTitle className="title">{t('title')}</PageTitle>
      <LoginForm />
      <div className="footer">
        <Link href="/forgot-password">{t('footerLink')}</Link>
      </div>
    </Container>
  );
}

export default Login;