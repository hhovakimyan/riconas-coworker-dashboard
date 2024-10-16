import { Link } from '@mui/material';

type Props = {
  emailAddress: string;
}

const EmailLink = ({emailAddress}: Props) =>
  <Link href={`mailto:${emailAddress}`}>{emailAddress}</Link>

export default EmailLink;