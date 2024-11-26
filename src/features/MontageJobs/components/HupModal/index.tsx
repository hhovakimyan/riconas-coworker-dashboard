import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, DialogTitle, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import {
  StyledCloseIconButton,
  StyledDialog,
  subtitleStyles,
} from 'features/MontageJobs/components/HupModal/styles';
import HupForm from 'features/MontageJobs/components/HupForm';
import HupPhotos from 'features/MontageJobs/components/HupModal/HupPhotos';
import { ApiListItem } from 'features/MontageJobs/types/jobs';
import {
  DetailsApiItem,
  EditableProps,
  PhotoListItem,
  Status,
} from 'features/MontageJobs/types/hups';
import { FetchDetailsResponseDto } from 'features/MontageJobs/services/models/Hups';
import { hupService } from 'features/MontageJobs/services';

import LoadingSpinner from 'components/LoadingSpinner';
import { ServiceError } from 'services/helperTypes';

type Props = {
  onClose: (newHupStatus?: Status) => void;
  jobData: ApiListItem;
};

const HupModal = ({ onClose, jobData }: Props) => {
  const [hupData, setHupData] = useState<DetailsApiItem | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openedPhotos, setOpenedPhotos] = useState<PhotoListItem[]>([]);
  const [closedPhotos, setClosedPhotos] = useState<PhotoListItem[]>([]);

  const { t } = useTranslation('montage-jobs');
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });

  useEffect(() => {
    if (jobData.id) {
      hupService.fetchDetails(jobData.id).then((response) => {
        if (response instanceof FetchDetailsResponseDto) {
          setHupData(response.data);
          setOpenedPhotos(response.data.opened_photos);
          setClosedPhotos(response.data.closed_photos);
        }
      });
    }
  }, [jobData.id]);

  const closeModal = (hupStatus?: Status) => {
    setHupData(null);

    onClose(hupStatus);
  };

  const onFormSubmit = async (
    newData: EditableProps,
    isDataChanged: boolean,
  ) => {
    if (!isDataChanged) {
      closeModal();
      return;
    }

    setIsLoading(true);
    const updateResponseDto = await hupService.updateDetails(jobData.id, {
      hup_type: newData.hupType,
      location: newData.hupLocation,
      is_pre_installed: newData.hupPreInstalled,
      is_installed: newData.hupInstalled,
    });

    setIsLoading(false);
    if (updateResponseDto instanceof ServiceError) {
      setSubmitError(mainT('somethingWentWrong'));
    } else {
      setSubmitError(null);
      closeModal(updateResponseDto.data.status);
    }
  };

  return (
    <StyledDialog open fullWidth maxWidth="lg">
      <DialogTitle>
        {jobData.address_line1} {jobData.address_line2} [{jobData.hup_code}]
        <StyledCloseIconButton
          aria-label="close"
          onClick={() => {
            closeModal();
          }}
        >
          <Close />
        </StyledCloseIconButton>
      </DialogTitle>
      <DialogContent>
        <Typography component="h2" sx={subtitleStyles}>
          {t('hupModal.subtitle', {
            buildingType: t(`buildingType.options.${jobData.building_type}`),
          })}
        </Typography>
        {hupData ? (
          <>
            <HupPhotos
              jobId={jobData.id}
              openedStatePhotos={openedPhotos}
              setOpenedStatePhotos={setOpenedPhotos}
              closedStatePhotos={closedPhotos}
              setClosedStatePhotos={setClosedPhotos}
            />
            <HupForm
              onSubmit={onFormSubmit}
              submitError={submitError}
              isLoading={isLoading}
              closeModal={closeModal}
              currentData={{
                hupType: hupData.hup_type || undefined,
                hupLocation: hupData.location || undefined,
                hupInstalled: hupData.status === Status.INSTALLED,
                hupPreInstalled: hupData.status === Status.PREINSTALLED,
              }}
            />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </DialogContent>
    </StyledDialog>
  );
};

export default HupModal;
