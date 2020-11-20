import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  children: React.ReactNode;
  title?: string;
};

function Layout({ title, children }: Props) {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>React Pokedex {title && `| ${title}`}</title>
      </Helmet>
    </Fragment>
  );
}

export default Layout;
