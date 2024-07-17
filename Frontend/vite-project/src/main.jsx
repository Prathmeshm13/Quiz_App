import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  {Provider}   from 'react-redux'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { store } from '../app/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
   <Auth0Provider
    domain="dev-71d2to5qeam3kpae.us.auth0.com"
    clientId="spNjMeIUlf4RDZzsxlJqGaGHIQXzCewy"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </Provider>
  </React.StrictMode>
)
