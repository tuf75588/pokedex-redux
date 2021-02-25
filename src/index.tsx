import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';
import './index.css';
import './tailwind.output.css';
import store from './features/store';

render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
