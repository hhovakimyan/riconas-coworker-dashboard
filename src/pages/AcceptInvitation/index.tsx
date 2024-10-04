import { Box, Link, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import PageTitle from 'components/PageTitle';
import { pageStyles } from 'pages/AcceptInvitation/styles';
import SetPasswordForm from 'pages/AcceptInvitation/SetPasswordForm';

const AcceptInvitation = () => {
  const [searchParams, ] = useSearchParams();
  const acceptInvitationCode = searchParams.get('code');

  const { t } = useTranslation('accept-invitation');

  const [isPasswordSet, setIsPasswordSet] = useState<boolean>(false);

  if (!acceptInvitationCode) {
    return <></>;
  }

  const onSubmit = () => {
    setIsPasswordSet(true);
  };

  return (
    <Box sx={pageStyles}>
      <Box className="innerContent">
        <PageTitle className="title">{t('title')}</PageTitle>
        {
          isPasswordSet ?
            <Typography>
              <Trans
                t={t}
                i18nKey={"accountActivatedMessage"}
                components={[<Link href="/login" key="sign-in-link" />]}
              />
            </Typography> :
            <SetPasswordForm
              acceptInvitationCode={acceptInvitationCode}
              onSubmit={onSubmit}
            />
        }
      </Box>
    </Box>
  )
}

export default AcceptInvitation;