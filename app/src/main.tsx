import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// A quiet nod to anyone who opens the console — this audience does.
if (typeof console !== 'undefined') {
  console.log(
    '%c› Establishing secure session\n%c✓ Access granted\n\n%cLooking at how this is built? Good instinct.\nThe interesting findings are never in the UI.\n\n%cmrarslan5156@gmail.com · hackerone.com/mrarslanakhtar',
    'color:#8C8C99;font-family:monospace',
    'color:#00E5FF;font-family:monospace',
    'color:#F0F0E6;font-family:monospace',
    'color:#B99A6B;font-family:monospace',
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
