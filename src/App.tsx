import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
function App() {
  return (
    <div className="bg-white">
      <Layout title="home">future homepage components will go here</Layout>
    </div>
  );
}

export default App;
