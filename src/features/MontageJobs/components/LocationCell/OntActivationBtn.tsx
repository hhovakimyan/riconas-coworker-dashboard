import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Status as OntStatus } from 'features/MontageJobs/types/ont';

type Props = {
  ontId: string;
  isOntActive: boolean;
  ontStatus: OntStatus;
  onClick: (ontId: string) => void;
};

const OntActivationBtn: React.FC<Props> = ({
  ontId,
  isOntActive,
  ontStatus,
  onClick,
}) => {
  const { t } = useTranslation('montage-jobs', {
    keyPrefix: 'table.locationCell',
  });

  return (
    <Button
      variant="contained"
      disabled={!isOntActive}
      color={ontStatus === OntStatus.INSTALLED ? 'success' : 'info'}
      onClick={() => {
        onClick(ontId);
      }}
      data-testid="activateBtn"
    >
      {t('ontActivation')}
    </Button>
  );
};

export default OntActivationBtn;
