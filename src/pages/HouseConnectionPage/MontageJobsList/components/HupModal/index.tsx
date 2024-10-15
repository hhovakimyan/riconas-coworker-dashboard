import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

import { HupDetailsApiItem } from 'types/montage-jobs';
import {
  StyledDialog,
  StyledCloseIconButton
} from 'pages/HouseConnectionPage/MontageJobsList/components/HupModal/styles';
import { hupService } from 'services';
import { FetchHupDetailsResponseDto } from 'services/models/Hups';
import LoadingSpinner from 'components/LoadingSpinner';

type Props = {
  jobId: string;
  onClose: () => void;
}

const HupModal = ({jobId, onClose}: Props) => {
  const [hupData, setHupData] = useState<HupDetailsApiItem | null>(null);
  const [submitError, setSubmitError] = useState<{[key: string]: string} | null>(null);

  const { t } = useTranslation('montage-jobs', { keyPrefix: 'hupModal' });

  useEffect(() => {
    if (jobId) {
      hupService
        .fetchDetails(jobId)
        .then((response: FetchHupDetailsResponseDto) => {
          setHupData(response.data);
        })
    }
  }, [jobId]);

  // const onFormSubmit = (newData: ChannelProps) => {
  //   setHupData(newData);
  //   setSubmitError(null);
  // };

  const closeModal = () => {
    setHupData(null);

    onClose();
  };

  return (
    <StyledDialog open fullWidth maxWidth='xs'>
      <Typography variant='subtitle2'>{t('form.editHeading')}</Typography>
      <StyledCloseIconButton
        aria-label="close"
        onClick={closeModal}
      >
        <Close color='secondary' />
      </StyledCloseIconButton>
      {!hupData && <LoadingSpinner />}
      {/* <ChannelForm */}
      {/*  onSubmit={onFormSubmit} */}
      {/*  onCancel={onClose} */}
      {/*  submitError={submitError} */}
      {/*  currentData={hupData} */}
      {/*  edit */}
      {/* /> */}
    </StyledDialog>
  );
}

export default HupModal;