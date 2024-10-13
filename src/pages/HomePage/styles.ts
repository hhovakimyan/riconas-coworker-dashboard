export const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '40px'
};

export const cardListWrapperStyles = {
  display: 'flex',
  columnGap: '40px',

  '& .MuiCard-root': {
    width: '500px',

    '&:first-child': {
      width: '300px',
    },
  },

  '& .MuiCardHeader-root': {
    backgroundColor: '#f0e7cd',
  }
};

export const projectTreeStyles = {};

export const projectLabelStyles = {
  display: 'flex',
  alignItems: 'center',
  columnGap: '5px',

  '& svg': {
    fontSize: '1.2rem'
  }
};