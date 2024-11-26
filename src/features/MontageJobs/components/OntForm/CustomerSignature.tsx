import SignatureCanvas from 'react-signature-canvas';
import { Box, IconButton, Typography } from '@mui/material';
import React, { RefObject, useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import {
  signatureBoxStyles,
  signatureWrapperStyles,
  signatureToolbarStyles,
  signatureCanvasWidth,
  signatureCanvasHeight,
  signaturePenColorsListStyles,
  signaturePenColorStyles,
  signatureClearBtnStyles,
} from 'features/MontageJobs/components/OntForm/styles';

type Props = {
  signature: string;
  ref: RefObject<SignatureCanvas> | null;
};

const penColors = ['#000', '#0a0ad5', '#06470a'];

const CustomerSignature: React.FC<Props> = ({ signature, ref }) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'ontModal' });

  const [selectedPenColor, setSelectedPenColor] = useState<string>(
    penColors[0],
  );

  const onSignatureDelete = () => {
    ref!.current!.clear();
  };

  useEffect(() => {
    if (signature && ref?.current) {
      ref?.current.fromDataURL(signature);
    }
  }, [signature]);

  return (
    <Box sx={signatureWrapperStyles}>
      <Box>
        <Typography fontWeight="bold">{t('signature')}</Typography>
        <Box className="toolbar" sx={signatureToolbarStyles}>
          <Box sx={signaturePenColorsListStyles}>
            {penColors.map((penColor) => (
              <Box
                key={`pen-color-${penColor}`}
                sx={{
                  ...signaturePenColorStyles,
                  backgroundColor: penColor,
                  border:
                    selectedPenColor === penColor
                      ? '2px solid #cba20c'
                      : 'none',
                }}
                onClick={() => {
                  setSelectedPenColor(penColor);
                }}
              />
            ))}
          </Box>
          <Box>
            <IconButton
              onClick={onSignatureDelete}
              sx={signatureClearBtnStyles}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box sx={signatureBoxStyles}>
        <SignatureCanvas
          penColor={selectedPenColor}
          canvasProps={{
            width: signatureCanvasWidth,
            height: signatureCanvasHeight,
          }}
          ref={ref}
        />
      </Box>
    </Box>
  );
};

export default CustomerSignature;
