import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// TypeScript may complain about side-effect CSS imports if no declaration is present.
// Ignore the error here to allow importing global CSS without adding declaration files.
// @ts-ignore: Implicitly has an 'any' type because module has no declaration
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
