import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';
import Layout from './components/Layout';

function App() {
  return (
    <div className="bg-white">
      <Layout title="home">welcome to the home page!</Layout>
    </div>
  );
}

export default App;
