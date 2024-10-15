import { styled, Dialog, IconButton } from '@mui/material';

export const StyledDialog = styled(Dialog)(() => ({
  '.MuiPaper-root': {
    padding: '1.25rem 0.875rem',
    backgroundColor: '#fff',
  }
}));

export const StyledCloseIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: '#000',
}));