import { Box, TableCell, Typography } from '@mui/material';

import { JobApiListItem } from 'types/blow-in-jobs';
import { multiValueCellStyles } from 'pages/HouseConnectionPage/BlowInJobsList/styles';
import { TableColumnAlign } from 'types/generic';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: JobApiListItem;
}

const LocationCell = ({ rowData, columnAlign }: Props) => (
    <TableCell
      align={columnAlign}
      sx={multiValueCellStyles}
    >
      <Box>
        <Typography>{rowData.subproject_code} / {rowData.nvt_code}</Typography>
      </Box>
    </TableCell>
  )


export default LocationCell;