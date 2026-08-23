import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PublicationsPage from './PublicationsPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PublicationsPage />
  </StrictMode>,
);
