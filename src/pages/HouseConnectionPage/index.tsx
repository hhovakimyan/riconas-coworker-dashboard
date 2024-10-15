import { Box } from '@mui/material';
import { useState } from 'react';

import Sidebar from 'components/Sidebar';
import { mainContentStyles } from 'pages/HouseConnectionPage/styles';
import { VIEW_TYPE_MOUNTING } from 'constants/main';
import MontageJobsList from 'pages/HouseConnectionPage/MontageJobsList';

const HouseConnectionPage = () => {
  const [viewType, setViewType] = useState<string>(VIEW_TYPE_MOUNTING);

  return (
    <Box>
      <Sidebar viewType={viewType} setViewType={setViewType} />
      <Box sx={mainContentStyles}>
        {viewType === VIEW_TYPE_MOUNTING && <MontageJobsList /> }
      </Box>
    </Box>
  );
}


export default HouseConnectionPage;