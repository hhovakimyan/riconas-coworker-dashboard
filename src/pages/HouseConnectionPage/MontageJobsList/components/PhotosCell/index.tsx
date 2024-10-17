import { Button, TableCell } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';

type Props = {
  photosCount: number;
  onGalleryBtnClick: () => void;
}

const PhotosCell = ({photosCount, onGalleryBtnClick}: Props) => (
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

export default PhotosCell;