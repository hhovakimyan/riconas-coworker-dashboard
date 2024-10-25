import { Button, TableCell } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';

type Props = {
  photosCount: number;
  onGalleryBtnClick: () => void;
}

const TablePhotosCell = ({photosCount, onGalleryBtnClick}: Props) => (
    <TableCell>
      <Button
        variant="outlined"
        color="info"
        startIcon={<CollectionsIcon />}
        onClick={onGalleryBtnClick}
      >
        ({photosCount})
      </Button>
    </TableCell>
);

export default TablePhotosCell;