
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import Recharts CSS if necessary (often it's self-contained or handled by components)
// For this setup, assuming Tailwind and inline/component styles are sufficient.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
    