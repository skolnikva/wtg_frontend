import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { NotificationProvider } from '@contexts/NotificationContext';
import { AuthModalProvider } from '@contexts/AuthModalContext';
import { FavoritesProvider } from '@contexts/FavoritesContext';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
          <AuthModalProvider>
            <FavoritesProvider>
              <AppRouter />
            </FavoritesProvider>
          </AuthModalProvider>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;