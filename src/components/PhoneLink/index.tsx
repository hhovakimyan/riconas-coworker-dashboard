import { Link } from '@mui/material';

type Props = {
  phoneNumber: string;
}

const PhoneLink = ({phoneNumber}: Props) =>
  <Link href={`tel:${phoneNumber}`}>{phoneNumber}</Link>


export default PhoneLink;