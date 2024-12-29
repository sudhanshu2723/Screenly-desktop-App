import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Import Stripe publishable key from .env file
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if(!PUBLISHABLE_KEY) {
  throw new Error('Missing Stripe publishable key')
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/' >
    <App />
    </ClerkProvider >
  </React.StrictMode>,
)

// Use contextBridge->listens to events from the main process
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})

