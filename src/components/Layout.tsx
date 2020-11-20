import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
type Props = {
  children: React.ReactNode;
  title?: string;
};

function Layout({ title, children }: Props) {
  return (
    <>
      <Navbar />
      <div className="px-2 md:px-24 lg:px-64 pt-24">{children}</div>
    </>
  );
}

export default Layout;
