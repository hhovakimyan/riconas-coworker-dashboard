import React, { ChangeEvent, ReactNode } from 'react';
import { styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type Props = {
  id: string;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  icon: ReactNode;
  accept: string;
  multiple: boolean;
  loading: boolean;
  sx?: Record<string, unknown>;
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
  multiple,
  sx,
  id,
  title,
  loading,
}) => (
  <LoadingButton
    id={id}
    component="label"
    color="primary"
    role={undefined}
    variant="contained"
    tabIndex={-1}
    startIcon={icon}
    sx={sx}
    loading={loading}
  >
    {title}
    <VisuallyHiddenInput
      type="file"
      onChange={onUpload}
      multiple={multiple}
      accept={accept}
    />
  </LoadingButton>
);

export default FileUploadButton;
