import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, DialogTitle, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

import { HupDetailsApiItem, JobApiListItem } from 'types/montage-jobs';
import {
  StyledDialog,
  StyledCloseIconButton, subtitleStyles,
} from 'pages/HouseConnectionPage/MontageJobsList/components/HupModal/styles';
import { hupService } from 'services';
import { FetchHupDetailsResponseDto } from 'services/models/Hups';
import LoadingSpinner from 'components/LoadingSpinner';
import HupForm from 'pages/HouseConnectionPage/MontageJobsList/components/HupForm';
import { HupEditableProps } from 'types/hups';

type Props = {
  onClose: () => void;
  jobData: JobApiListItem;
}

const HupModal = ({onClose, jobData}: Props) => {
  const [hupData, setHupData] = useState<HupDetailsApiItem | null>(null);
  const [submitError, setSubmitError] = useState<{[key: string]: string} | null>(null);

  const { t } = useTranslation('montage-jobs');

  useEffect(() => {
    if (jobData.id) {
      hupService
        .fetchDetails(jobData.id)
        .then((response: FetchHupDetailsResponseDto) => {
          setHupData(response.data);
        })
    }
  }, [jobData.id]);

  const onFormSubmit = (newData: HupEditableProps) => {
    // Update HUP data in db
    console.log(newData);
    setSubmitError(null);
  };

  const closeModal = () => {
    setHupData(null);

    onClose();
  };

  return (
    <StyledDialog open fullWidth maxWidth="lg">
      <DialogTitle>
        {jobData.address_line1} {jobData.address_line2} [{jobData.hup_code}]
        <StyledCloseIconButton
          aria-label="close"
          onClick={closeModal}
        >
          <Close />
        </StyledCloseIconButton>
      </DialogTitle>
      <DialogContent>
        <Typography component="h2" sx={subtitleStyles}>
          {
            t(
              'hupModal.subtitle',
              {
                buildingType: t(`buildingType.options.${jobData.building_type}`)
              }
            )
          }
        </Typography>
        {
          hupData ?
            <HupForm onSubmit={onFormSubmit} isLoading={false} /> :
            <LoadingSpinner />
        }
      </DialogContent>
    </StyledDialog>
  );
}

export default HupModal;