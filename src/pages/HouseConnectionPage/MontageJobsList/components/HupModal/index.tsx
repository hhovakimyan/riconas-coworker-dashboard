import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, DialogTitle, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

import { HupDetailsApiItem, HupStatus, JobApiListItem } from 'types/montage-jobs';
import {
  StyledCloseIconButton,
  StyledDialog,
  subtitleStyles,
} from 'pages/HouseConnectionPage/MontageJobsList/components/HupModal/styles';
import { hupService } from 'services';
import { FetchHupDetailsResponseDto } from 'services/models/Hups';
import LoadingSpinner from 'components/LoadingSpinner';
import HupForm from 'pages/HouseConnectionPage/MontageJobsList/components/HupForm';
import { HupEditableProps } from 'types/hups';
import { ServiceError } from 'services/helperTypes';

type Props = {
  onClose: () => void;
  jobData: JobApiListItem;
}

const HupModal = ({onClose, jobData}: Props) => {
  const [hupData, setHupData] = useState<HupDetailsApiItem | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation('montage-jobs');
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });

  useEffect(() => {
    if (jobData.id) {
      hupService
        .fetchDetails(jobData.id)
        .then((response: FetchHupDetailsResponseDto) => {
          setHupData(response.data);
        })
    }
  }, [jobData.id]);

  const closeModal = () => {
    setHupData(null);

    onClose();
  };

  const onFormSubmit = async (newData: HupEditableProps, isDataChanged: boolean) => {
    if (!isDataChanged) {
      return;
    }

    setIsLoading(true);
    const updateResponseDto = await hupService.updateDetails(
      jobData.id,
      {
        hup_type: newData.hupType,
        location: newData.hupLocation,
        is_pre_installed: newData.hupPreInstalled,
        is_installed: newData.hupInstalled,
        opened_hup_photo_path: newData.openedHupPhoto,
        closed_hup_photo_path: newData.closedHupPhoto,
      }
    );
    setIsLoading(false);
    if (updateResponseDto instanceof ServiceError) {
      setSubmitError(mainT('somethingWentWrong'));
    } else {
      setSubmitError(null);
      closeModal();
    }
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
            <HupForm
              onSubmit={onFormSubmit}
              submitError={submitError}
              isLoading={isLoading}
              closeModal={closeModal}
              currentData={{
                hupType: hupData.hup_type || undefined,
                hupLocation: hupData.location || undefined,
                closedHupPhoto: undefined,
                openedHupPhoto: undefined,
                hupInstalled: hupData.status === HupStatus.INSTALLED,
                hupPreInstalled: hupData.status === HupStatus.PREINSTALLED,
              }}
            /> :
            <LoadingSpinner />
        }
      </DialogContent>
    </StyledDialog>
  );
}

export default HupModal;