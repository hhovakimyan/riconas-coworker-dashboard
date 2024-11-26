import { Box, TableCell, Typography } from '@mui/material';
import { UiListItem } from 'features/BlowInJobs/types';

import { multiValueCellStyles } from 'pages/HouseConnectionPage/BlowInJobsList/styles';
import { TableColumnAlign } from 'types/generic';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: Pick<UiListItem, 'subproject_code' | 'nvt_code'>;
};

const LocationCell = ({ rowData, columnAlign }: Props) => (
  <TableCell align={columnAlign} sx={multiValueCellStyles}>
    <Box>
      <Typography>
        {rowData.subproject_code} / {rowData.nvt_code}
      </Typography>
    </Box>
  </TableCell>
);

export default LocationCell;
