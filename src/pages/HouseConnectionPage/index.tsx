import { Box } from '@mui/material';
import { useAppSelector } from 'store/hooks';

import Sidebar from 'components/Sidebar';
import { mainContentStyles } from 'pages/HouseConnectionPage/styles';
import { VIEW_TYPE_BLOW_IN, VIEW_TYPE_MOUNTING } from 'constants/main';
import MontageJobsList from 'pages/HouseConnectionPage/MontageJobsList';
import BlowInJobsList from 'pages/HouseConnectionPage/BlowInJobsList';

const HouseConnectionPage = () => {
  const viewType = useAppSelector((state) => state.sidebar.viewType);

  return (
    <Box>
      <Sidebar />
      <Box sx={mainContentStyles}>
        {viewType === VIEW_TYPE_MOUNTING && <MontageJobsList />}
        {viewType === VIEW_TYPE_BLOW_IN && <BlowInJobsList />}
      </Box>
    </Box>
  );
};

export default HouseConnectionPage;
