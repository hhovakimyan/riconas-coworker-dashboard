import { TableCell, Typography } from '@mui/material';
import { subprojectNvtCodesStyles } from 'features/MontageJobs/components/CabelCodeCell/styles';
import { JobApiListItem } from 'features/MontageJobs/types/main';

import { TableColumnAlign } from 'types/generic';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: Pick<
    JobApiListItem,
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
