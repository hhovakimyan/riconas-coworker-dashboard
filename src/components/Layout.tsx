import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import Header from 'components/Header';
import { useAuth } from 'providers/AuthContext';
import MainContent from 'components/MainContent';
import Snackbar from 'components/Snackbar';

const noAuthRoutes = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/accept-invite',
];

const Layout = () => {
  const location = useLocation();
  const { userSignedIn } = useAuth();

  if (noAuthRoutes.includes(location.pathname)) {
    if (userSignedIn) {
      return <Navigate to={'/'} replace />
    }
  } else if (!userSignedIn) {
    return <Navigate to={'/login'} replace />
  }

  return (
    <>
      <CssBaseline />
      <Header />
        {
          userSignedIn ?
            (
              <Box sx={{ display: 'flex' }}>
                <MainContent open>
                  <Outlet />
                </MainContent>
                <Snackbar />
              </Box>
            ) :
            (
              <main>
                <Outlet />
              </main>
            )
        }
    </>
  )
}

export default Layout;