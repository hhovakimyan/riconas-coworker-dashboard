import React from 'react';
import { Box, Snackbar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
    snackBarSectionStyles,
    uploadFileErrorSnackbarStyles
} from 'components/UploadFileErrorSnackbar/styles';

type Props = {
    error: string;
    handleClose: () => void;
}

const UploadFileErrorSnackbar: React.FC<Props> = ({ error, handleClose }) => {
    const { t } = useTranslation('main', { keyPrefix: 'fileUploadErrorSnackbar' });

    return (
        <Snackbar
            autoHideDuration={4000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open
            onClose={handleClose}
        >
            <Box sx={uploadFileErrorSnackbarStyles}>
                <Box sx={snackBarSectionStyles}>
                    <Typography>{t('error')}: {error}</Typography>
                </Box>
                <Box sx={snackBarSectionStyles}>
                    <Typography>{t('tryAgain')}</Typography>
                </Box>
            </Box>
        </Snackbar>
    );
};

export default UploadFileErrorSnackbar;
