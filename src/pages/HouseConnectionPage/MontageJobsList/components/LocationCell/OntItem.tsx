import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';

import { JobOntListItem, OntStatus } from 'types/montage-jobs';
import EmailLink from 'components/EmailLink';
import PhoneLink from 'components/PhoneLink';
import {
  hupButtonsWrapperStyles,
  onItemStyles,
} from 'pages/HouseConnectionPage/MontageJobsList/components/LocationCell/styles';

type Props = {
  data: JobOntListItem;
  onOntActivationBtnClick: (ontId: string) => void;
}

const OntItem = ({data, onOntActivationBtnClick}: Props) => {
  const { t } = useTranslation('montage-jobs', { keyPrefix: 'table.locationCell' });

  return (
    <Box sx={onItemStyles}>
      <Typography>{data.code}</Typography>
      {
        data.customer_email &&
        <>
          <Typography>{data.customer_name}</Typography>
          <EmailLink emailAddress={data.customer_email} />
          {
            data.customer_phone1 &&
            <PhoneLink phoneNumber={data.customer_phone1} />
          }
          {
            data.customer_phone2 &&
            <PhoneLink phoneNumber={data.customer_phone2} />
          }
        </>
      }
      <Box sx={hupButtonsWrapperStyles}>
        <Button
          variant="contained"
          color={data.status === OntStatus.INSTALLED ? 'success' : 'info'}
          onClick={() => { onOntActivationBtnClick(data.id) }}
        >
          {t('ontActivation')}
        </Button>
        <Button variant="contained" color="warning">{t('dispatcherFeedback')}</Button>
      </Box>
    </Box>
  )
}

export default OntItem;