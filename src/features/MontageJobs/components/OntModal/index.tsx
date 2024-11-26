import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, DialogTitle, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import {
  StyledCloseIconButton,
  StyledDialog,
  subtitleStyles,
} from 'features/MontageJobs/components/OntModal/styles';
import OntForm from 'features/MontageJobs/components/OntForm';
import OntPhotos from 'features/MontageJobs/components/OntModal/OntPhotos';
import { ApiListItem } from 'features/MontageJobs/types/jobs';
import {
  DetailsProps,
  EditableProps,
  PhotoListItem,
  Status,
} from 'features/MontageJobs/types/ont';
import { FetchDetailsResponseDto } from 'features/MontageJobs/services/models/Ont';
import { ontService } from 'features/MontageJobs/services';

import LoadingSpinner from 'components/LoadingSpinner';
import { ServiceError } from 'services/helperTypes';

type Props = {
  onClose: (newOntStatus?: Status) => void;
  ontId: string;
  ontCode: string;
  jobData: ApiListItem;
};

const OntModal = ({ onClose, ontId, ontCode, jobData }: Props) => {
  const [ontData, setOntData] = useState<DetailsProps | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [photos, setPhotos] = useState<PhotoListItem[]>([]);

  const { t } = useTranslation('montage-jobs');
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });

  useEffect(() => {
    if (ontId) {
      ontService.fetchDetails(ontId).then((response) => {
        if (response instanceof FetchDetailsResponseDto) {
          setOntData(response.data);
          setPhotos(response.data.photos);
        }
      });
    }
  }, [ontId]);

  const closeModal = (newOntStatus?: Status) => {
    setOntData(null);

    onClose(newOntStatus);
  };

  const onFormSubmit = async (newData: EditableProps) => {
    setIsLoading(true);
    const updateResponseDto = await ontService.updateDetails(ontId, {
      ont_type: newData.ontType,
      odf_code: newData.odfCode,
      odf_pos: newData.odfPos,
      is_pre_installed: newData.ontPreInstalled,
      is_installed: newData.ontInstalled,
      signature: newData.signature || null,
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
        {jobData.address_line1} {jobData.address_line2} [{ontCode}]
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
          {t('ontModal.subtitle', { ontCode })}
        </Typography>
        {ontData ? (
          <>
            <OntPhotos jobId={ontId} photos={photos} setPhotos={setPhotos} />
            <OntForm
              onSubmit={onFormSubmit}
              submitError={submitError}
              isLoading={isLoading}
              closeModal={closeModal}
              currentData={ontData}
            />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </DialogContent>
    </StyledDialog>
  );
};

export default OntModal;
