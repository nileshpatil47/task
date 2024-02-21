import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container);

document.addEventListener('turbo:load', () => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
});
