import { ReactElement } from 'react';
import { Box } from '@mui/material';

import { tableWrapperStyles } from 'components/TableWrapper/styles';

type Props = {
  children: ReactElement;
};

const TableWrapper = ({ children }: Props) => (
  <Box sx={tableWrapperStyles}>{children}</Box>
);

export default TableWrapper;
