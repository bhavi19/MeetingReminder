import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId="558195528063-ougbtf35h3hmhookipftsps0i2l76pft.apps.googleusercontent.com"
    >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
