import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from 'store';
import { Provider } from 'react-redux';

import Login from 'pages/Login';
import Layout from 'components/Layout';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import { AuthProvider } from 'providers/AuthContext';
import HomePage from 'pages/HomePage';
import { SnackbarProvider } from 'providers/Snackbar';
import LoadingSpinner from 'components/LoadingSpinner';
import AcceptInvitation from 'pages/AcceptInvitation';
import ChangePasswordPage from 'pages/ChangePasswordPage';
import HouseConnectionPage from 'pages/HouseConnectionPage';

const pageRoutes = [
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/accept-invite',
    element: <AcceptInvitation />,
  },
  {
    path: '/change-password',
    element: <ChangePasswordPage />,
  },
  {
    path: '/house-connections',
    element: <HouseConnectionPage />,
  },
];

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SnackbarProvider>
        <AuthProvider>
          <Provider store={store}>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  {pageRoutes.map((pageRoute) => (
                    <Route
                      key={`route-${pageRoute.path}`}
                      path={pageRoute.path}
                      element={pageRoute.element}
                    />
                  ))}
                </Route>
              </Routes>
            </BrowserRouter>
          </Provider>
        </AuthProvider>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
