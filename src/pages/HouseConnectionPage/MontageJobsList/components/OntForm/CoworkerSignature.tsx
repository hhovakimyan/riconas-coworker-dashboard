import SignatureCanvas from 'react-signature-canvas'
import { Box, IconButton, Typography } from '@mui/material';
import React, { SetStateAction, useRef, useState } from 'react';
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
} from 'pages/HouseConnectionPage/MontageJobsList/components/OntForm/styles';

type Props = {
  signature: string | null;
  setSignature: React.Dispatch<SetStateAction<string | null>>;
}

const penColors = [
  "#000",
  "#0a0ad5",
  "#06470a"
];

const CoworkerSignature: React.FC<Props> = ({signature, setSignature}) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'ontModal' })

  const [selectedPenColor, setSelectedPenColor] = useState<string>(penColors[0]);
  const signatureCanvasRef = useRef<SignatureCanvas>(null);

  const onSignatureDelete = () => {
    setSignature(null);
    signatureCanvasRef!.current!.clear();
  }

  return (
    <Box sx={signatureWrapperStyles}>
      <Box>
        <Typography fontWeight="bold">{t('signature')}</Typography>
        <Box className="toolbar" sx={signatureToolbarStyles}>
          <Box sx={signaturePenColorsListStyles}>
            {
              penColors.map((penColor) =>
                <Box
                  key={`pen-color-${penColor}`}
                  sx={{
                    ...signaturePenColorStyles,
                    backgroundColor: penColor,
                    border: selectedPenColor === penColor ? '2px solid #cba20c' : 'none'
                  }}
                  onClick={() => {
                    setSelectedPenColor(penColor);
                  }}
                />
              )
            }
          </Box>
          <Box>
            <IconButton onClick={onSignatureDelete} sx={signatureClearBtnStyles}>
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
          ref={signatureCanvasRef}
        />
      </Box>
    </Box>
  )
}

export default CoworkerSignature;