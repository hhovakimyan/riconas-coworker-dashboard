import React, { useCallback } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Button } from '@mui/material';

type Props = {
  filePath: string;
};

const HbFileButton: React.FC<Props> = ({ filePath }) => {
  const onClick = useCallback(() => {
    window.location.href = filePath;
  }, [filePath]);

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={<PictureAsPdfIcon />}
    >
      HB
    </Button>
  );
};

export default React.memo(HbFileButton);
