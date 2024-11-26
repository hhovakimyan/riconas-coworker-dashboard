import React, { useCallback } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Button } from '@mui/material';

type Props = {
  filePath: string;
};

const TbFileButton: React.FC<Props> = ({ filePath }) => {
  const onClick = useCallback(() => {
    window.location.href = filePath;
  }, [filePath]);

  return (
    <Button
      color="warning"
      variant="outlined"
      onClick={onClick}
      startIcon={<PictureAsPdfIcon />}
    >
      TB
    </Button>
  );
};

export default React.memo(TbFileButton);
