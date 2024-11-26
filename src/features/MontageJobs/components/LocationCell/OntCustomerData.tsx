import { Typography } from '@mui/material';
import React from 'react';
import { JobOntListItem } from 'features/MontageJobs/types/main';

import EmailLink from 'components/EmailLink';
import PhoneLink from 'components/PhoneLink';

type Props = {
  customerData: Pick<
    JobOntListItem,
    'customer_name' | 'customer_email' | 'customer_phone1' | 'customer_phone2'
  > & {
    customer_email: string;
  };
};

const OntCustomerData: React.FC<Props> = ({ customerData }) => {
  const { customer_name, customer_email, customer_phone1, customer_phone2 } =
    customerData;

  return (
    <>
      <Typography data-testid="ontCustomerName">{customer_name}</Typography>
      <EmailLink emailAddress={customer_email} />
      {customer_phone1 && <PhoneLink phoneNumber={customer_phone1} />}
      {customer_phone2 && <PhoneLink phoneNumber={customer_phone2} />}
    </>
  );
};

export default OntCustomerData;
