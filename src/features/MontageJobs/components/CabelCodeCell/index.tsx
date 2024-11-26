import { TableCell, Typography } from '@mui/material';
import { subprojectNvtCodesStyles } from 'features/MontageJobs/components/CabelCodeCell/styles';
import { ApiListItem } from 'features/MontageJobs/types/jobs';

import { TableColumnAlign } from 'types/tables';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: Pick<
    ApiListItem,
    'subproject_code' | 'nvt_code' | 'cabel_code_planned'
  >;
};

const CabelCodePlannedCell = ({ columnAlign, rowData }: Props) => (
  <TableCell align={columnAlign}>
    <Typography sx={subprojectNvtCodesStyles}>
      {`${rowData.subproject_code}_${rowData.nvt_code}`}
    </Typography>
    <Typography>{rowData.cabel_code_planned}</Typography>
  </TableCell>
);

export default CabelCodePlannedCell;
