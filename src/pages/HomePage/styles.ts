import { Box, styled } from '@mui/material';

export const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '40px'
};

export const StyledCardListWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  columnGap: '40px',
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    rowGap: '40px',
  },

  '& .MuiCard-root': {
    width: '500px',
    [theme.breakpoints.down('sm')]: {
      width: '350px',
    },


    '&:first-child': {
      width: '350px',
    },
  },

  '& .MuiCardHeader-root': {
    backgroundColor: '#f0e7cd',
  },
}));

export const projectTreeStyles = {};

export const projectLabelStyles = {
  display: 'flex',
  alignItems: 'center',
  columnGap: '5px',

  '& svg': {
    fontSize: '1.2rem'
  }
};