import { Box } from '@mui/material';
import { useState } from 'react';

import Sidebar from 'components/Sidebar';
import { mainContentStyles } from 'pages/HouseConnectionPage/styles';
import { VIEW_TYPE_BLOW_IN, VIEW_TYPE_MOUNTING } from 'constants/main';
import MontageJobsList from 'pages/HouseConnectionPage/MontageJobsList';
import { SidebarFilterProps } from 'types/generic';
import BlowInJobsList from 'pages/HouseConnectionPage/BlowInJobsList';

const HouseConnectionPage = () => {
  const [viewType, setViewType] = useState<string>(VIEW_TYPE_BLOW_IN);
  const [sidebarFilter, setSidebarFilter] = useState<SidebarFilterProps | null>(null);

  return (
    <Box>
      <Sidebar
        viewType={viewType}
        setViewType={setViewType}
        onFilterSelect={(filter) => {
          setSidebarFilter(filter);
        }}
      />
      <Box sx={mainContentStyles}>
        {viewType === VIEW_TYPE_MOUNTING && <MontageJobsList sidebarFilter={sidebarFilter} /> }
        {viewType === VIEW_TYPE_BLOW_IN && <BlowInJobsList sidebarFilter={sidebarFilter} /> }
      </Box>
    </Box>
  );
}


export default HouseConnectionPage;