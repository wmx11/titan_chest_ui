import React from 'react';
import Container from '../../Container';
import LinksGroup from './Sidenav/LinksGroup';
import Sidenav from './Sidenav/Sidenav';

function AdminLayout({ children }) {
  return (
    <main className="flex bg-white">
      <Sidenav homeTitle="Dashboard" homeHref="/admin">
        <LinksGroup />
      </Sidenav>
      <Container>{children}</Container>
    </main>
  );
}

export default AdminLayout;
