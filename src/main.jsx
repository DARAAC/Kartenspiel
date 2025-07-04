import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const rootElement = document.getElementById('root');
if (!rootElement){
  throw new Error("Root element not found");
}

/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)