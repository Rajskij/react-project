import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ResponseContextProvider } from "./context/ResponseContext";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResponseContextProvider>
      <App />
    </ResponseContextProvider>
  </StrictMode>,
)
