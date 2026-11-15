import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LocalStorageStore } from './storage/LocalStorageStore';
import { StoreProvider } from './storage/StoreContext';
import './theme.css';

const store = new LocalStorageStore();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
);
