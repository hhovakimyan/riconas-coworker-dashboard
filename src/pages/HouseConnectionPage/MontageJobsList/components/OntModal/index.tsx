import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, DialogTitle, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

import {
  StyledCloseIconButton,
  StyledDialog,
  subtitleStyles,
} from 'pages/HouseConnectionPage/MontageJobsList/components/OntModal/styles';
import { montageOntService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import { ServiceError } from 'services/helperTypes';
import { JobApiListItem } from 'types/montage-jobs';
import { FetchOntDetailsResponseDto } from 'services/models/Ont';
import { OntDetailsProps, OntEditableProps, OntPhotoListItem, OntStatus } from 'types/ont';
import OntForm from 'pages/HouseConnectionPage/MontageJobsList/components/OntForm';
import OntPhotos from 'pages/HouseConnectionPage/MontageJobsList/components/OntModal/OntPhotos';

type Props = {
  onClose: (newOntStatus?: OntStatus) => void;
  ontId: string;
  ontCode: string;
  jobData: JobApiListItem;
}

const OntModal = ({onClose, ontId, ontCode, jobData}: Props) => {
  const [ontData, setOntData] = useState<OntDetailsProps | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [photos, setPhotos] = useState<OntPhotoListItem[]>([]);

  const { t } = useTranslation('montage-jobs');
  const { t: mainT } = useTranslation('main', { keyPrefix: 'errors' });

  useEffect(() => {
    if (ontId) {
      montageOntService
        .fetchDetails(ontId)
        .then((response: FetchOntDetailsResponseDto) => {
          setOntData(response.data);
          setPhotos(response.data.photos);
        })
    }
  }, [ontId]);

  const closeModal = (newOntStatus?: OntStatus) => {
    setOntData(null);

    onClose(newOntStatus);
  };

  const onFormSubmit = async (newData: OntEditableProps) => {
    setIsLoading(true);
    const updateResponseDto = await montageOntService.updateDetails(
      ontId,
      {
        ont_type: newData.ontType,
        odf_code: newData.odfCode,
        odf_pos: newData.odfPos,
        is_pre_installed: newData.ontPreInstalled,
        is_installed: newData.ontInstalled,
        signature: newData.signature || null,
      }
    );
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
          {
            t('ontModal.subtitle', { ontCode, })
          }
        </Typography>
        {
          ontData ?
            <>
               <OntPhotos
                jobId={ontId}
                photos={photos}
                setPhotos={setPhotos}
               />
               <OntForm
                onSubmit={onFormSubmit}
                submitError={submitError}
                isLoading={isLoading}
                closeModal={closeModal}
                currentData={ontData}
              />
            </> :
            <LoadingSpinner />
        }
      </DialogContent>
    </StyledDialog>
  );
}

export default OntModal;