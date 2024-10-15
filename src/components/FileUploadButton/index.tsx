import React, { ChangeEvent, ReactNode } from 'react';
import { Button, styled } from '@mui/material';

type Props = {
    onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
    icon: ReactNode;
    accept: string;
    sx?: Record<string, unknown>;
    id: string;
    title?: string;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUploadButton: React.FC<Props> = ({
  onUpload,
  icon,
  accept,
  sx,
  id,
  title,
}) => (
  <Button
    id={id}
    component="label"
    color="primary"
    role={undefined}
    variant="contained"
    tabIndex={-1}
    startIcon={icon}
    sx={sx}
  >
    {title}
    <VisuallyHiddenInput
      type="file"
      onChange={onUpload}
      multiple
      accept={accept}
    />
  </Button>
);

export default FileUploadButton;
