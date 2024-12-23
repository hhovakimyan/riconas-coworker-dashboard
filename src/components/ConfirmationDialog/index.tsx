import * as React from 'react';
import { ReactNode } from 'react';
import { CircularProgress, DialogContent, Dialog, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import {
  actionButtonStyles,
  dialogStyles,
  loadingIconStyles,
  StyledCloseIconButton,
  StyledDialogActions,
  StyledDialogTitle,
} from 'components/ConfirmationDialog/styles';

interface ConfirmationDialogProps {
  title: string;
  content: ReactNode;
  onSubmit: () => void;
  onClose: () => void;
  cancelBtnProps?: {
    text?: string;
    variant: 'text' | 'contained';
  };
  confirmText?: string;
  isLoading?: boolean;
  customStyles?: Record<string, unknown>;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  content,
  onSubmit,
  onClose,
  cancelBtnProps,
  confirmText,
  isLoading = false,
  customStyles,
}) => {
  const { t } = useTranslation('main');

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onSubmit();
  };

  return (
    <Dialog sx={{ ...dialogStyles, ...customStyles }} maxWidth="xs" open>
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledCloseIconButton
        aria-label="close"
        onClick={handleCancel}
        data-testid="closeBtn"
      >
        <Close color="secondary" />
      </StyledCloseIconButton>
      <DialogContent data-testid="dialog-content">{content}</DialogContent>
      <StyledDialogActions>
        {cancelBtnProps ? (
          <Button
            autoFocus
            size="small"
            onClick={handleCancel}
            disabled={isLoading}
            variant={cancelBtnProps.variant}
            sx={actionButtonStyles}
            color="info"
            data-testid="cancelBtn"
          >
            {cancelBtnProps.text || t('confirmDialog.cancelText')}
          </Button>
        ) : null}
        <Button
          onClick={handleOk}
          disabled={isLoading}
          size="small"
          variant="contained"
          sx={actionButtonStyles}
          color="primary"
          data-testid="confirmBtn"
        >
          {confirmText || t('confirmDialog.confirmText')}
        </Button>
        {isLoading && (
          <CircularProgress size="1.25rem" sx={loadingIconStyles} />
        )}
      </StyledDialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
