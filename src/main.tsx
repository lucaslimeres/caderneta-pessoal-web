import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import './styles/tokens.css';
import './styles/site.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Em produção o HTML já vem pré-renderizado: o React só "hidrata". Em desenvolvimento, renderiza do zero.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
