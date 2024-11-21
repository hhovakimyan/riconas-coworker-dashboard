import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';

import { JobOntListItem } from 'types/montage-jobs';
import {
  hupButtonsWrapperStyles,
  onItemStyles,
} from 'pages/HouseConnectionPage/MontageJobsList/components/LocationCell/styles';
import OntActivationBtn from 'pages/HouseConnectionPage/MontageJobsList/components/LocationCell/OntActivationBtn';
import OntCustomerData from 'pages/HouseConnectionPage/MontageJobsList/components/LocationCell/OntCustomerData';

type Props = {
  data: JobOntListItem;
  onOntActivationBtnClick: (ontId: string) => void;
  onOntDispatcherBtnClick: (ontId: string) => void;
};

const OntItem = ({
  data,
  onOntActivationBtnClick,
  onOntDispatcherBtnClick,
}: Props) => {
  const { t } = useTranslation('montage-jobs', {
    keyPrefix: 'table.locationCell',
  });

  return (
    <Box sx={onItemStyles}>
      <Typography data-testid="ontCode">{data.code}</Typography>
      {data.customer_email && (
        <OntCustomerData
          customerData={{
            customer_email: data.customer_email,
            customer_name: data.customer_name,
            customer_phone1: data.customer_phone1,
            customer_phone2: data.customer_phone2,
          }}
        />
      )}
      <Box sx={hupButtonsWrapperStyles}>
        <OntActivationBtn
          ontId={data.id}
          isOntActive={data.is_active}
          ontStatus={data.status}
          onClick={onOntActivationBtnClick}
        />
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            onOntDispatcherBtnClick(data.id);
          }}
          data-testid="dispatchBtn"
        >
          {t('dispatcherFeedback')}
        </Button>
      </Box>
    </Box>
  );
};

export default OntItem;
