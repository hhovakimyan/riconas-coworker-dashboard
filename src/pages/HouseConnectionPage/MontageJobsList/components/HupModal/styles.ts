import { styled, Dialog, IconButton } from '@mui/material';

export const StyledDialog = styled(Dialog)(() => ({
  '.MuiPaper-root': {
    padding: 0,
    backgroundColor: '#fff',
  },
  '& .MuiDialogContent-root': {
    paddingTop: '20px',
  },
  '& .MuiDialogTitle-root': {
    fontSize: '1.5rem',
  },
}));

export const StyledCloseIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: '#000',
}));

export const subtitleStyles = {
  fontSize: '1.25rem',
}

export const actionButtonWrapperStyles = {
  display: 'flex',
  columnGap: '20px',
}