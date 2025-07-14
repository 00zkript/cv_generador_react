import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
// import Tailwind from 'primereact/passthrough/tailwind';
import './index.css';
import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            {/* <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}> */}
            <PrimeReactProvider>
                <App />
            </PrimeReactProvider>
        </BrowserRouter>
    </StrictMode>
);
