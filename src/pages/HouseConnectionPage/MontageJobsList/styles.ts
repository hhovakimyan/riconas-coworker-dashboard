import { sidebarWidth } from 'constants/main';

export const multiValueCellStyles = {
  padding: '10px !important',
  '& .MuiTypography-root': {
    marginBottom: '5px',
  }
}

export const tableContainerStyles = {
  maxHeight: '80vh',
  maxWidth: `calc(100vw - ${sidebarWidth + 60}px)`,
}