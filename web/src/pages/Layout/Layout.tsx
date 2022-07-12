import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}: LayoutProps) => {
  return (
    <div>
      <Header banner='Siguenza' />
      <Outlet />
    </div>
  );
};

export default Layout;
