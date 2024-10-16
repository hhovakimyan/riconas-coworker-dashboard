import { TableCell, Typography } from '@mui/material';

import { TableColumnAlign } from 'types/generic';
import { JobApiListItem } from 'types/montage-jobs';
import { subprojectNvtCodesStyles } from 'pages/HouseConnectionPage/MontageJobsList/components/CabelCodeCell/styles';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: JobApiListItem;
}

const CabelCodePlannedCell = ({columnAlign, rowData}: Props) => (
    <TableCell align={columnAlign}>
      <Typography sx={subprojectNvtCodesStyles}>
        {`${rowData.subproject_code}_${rowData.nvt_code}`}
      </Typography>
      <Typography>{rowData.cabel_code_planned}</Typography>
    </TableCell>
  )

export default CabelCodePlannedCell;