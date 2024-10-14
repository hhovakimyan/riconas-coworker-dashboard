import { Box } from '@mui/material';

import Sidebar from 'components/Sidebar';
import { mainContentStyles } from 'pages/HouseConnectionPage/style';

const HouseConnectionPage = () => (
    <Box>
      <Sidebar />
      <Box sx={mainContentStyles}>Welcome to house connections</Box>
    </Box>
);

export default HouseConnectionPage;