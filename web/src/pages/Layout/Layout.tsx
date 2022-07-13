import React, { FC, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import { HeaderContext } from '../../context/header.context';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}: LayoutProps) => {
  const [header, setHeader] = useState({
    familyName: '',
  });

  const memoizedHeader = useMemo(
    () => ({ header, setHeader }),
    [header, setHeader]
  );

  return (
    <HeaderContext.Provider
      value={{
        ...memoizedHeader,
      }}
    >
      <div>
        <Header banner={header.familyName} />
        <Outlet />
      </div>
    </HeaderContext.Provider>
  );
};

export default Layout;
