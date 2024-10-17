import { IconButton, styled } from '@mui/material';

export const StyledCloseIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: '#000',
}));

export const dialogStyles = {
  '& .MuiDialogTitle-root': {
    borderBottom: '1px solid #d1cece',
  },
  '& .MuiDialogContent-root': {
    paddingTop: '20px',
  },
  '& .MuiImageListItemBar-actionIcon': {
    display: 'flex',
    alignItems: 'center',

    '& .MuiIconButton-root, & .MuiLink-root': {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    '& .MuiLink-root': {
      lineHeight: 0,
      display: 'block',
      padding: '8px',
    }
  }
};

export const imagesListStyles = {
  width: 500,
  height: 450,
};

export const noImagesTextStyles = {
  fontSize: '1.5rem',
};