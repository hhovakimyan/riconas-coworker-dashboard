import { Box, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { headerStyles } from 'components/Header/styles';
import logo from 'components/Header/logo.png';
import LanguageMenu from 'components/Header/LanguageMenu';
import { useAuth } from 'providers/AuthContext';

const Header = () => {
  const { userSignedIn, clearAccessToken } = useAuth();
  const { t } = useTranslation('main', { keyPrefix: 'header' })

  const onSignOut = () => {
    clearAccessToken();
  }

  return (
    <Box component="header" sx={headerStyles}>
      <div className="innerContent">
        <div className="leftSection">
          <Link href="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        <div className="rightSection">
          <LanguageMenu />
          {
            userSignedIn &&
            <Link component="button" underline="none" onClick={onSignOut}>
              {t('signOut')}
            </Link>
          }
        </div>
      </div>
    </Box>
  )

};

export default Header