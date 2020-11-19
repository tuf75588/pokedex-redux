import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="bg-white">
      <h1 className="text-gray-900 dark:text-white">Dark mode is here!</h1>
      <p className="text-gray-600 dark:text-gray-300">Lorem ipsum...</p>
    </div>
  );
}

export default App;
