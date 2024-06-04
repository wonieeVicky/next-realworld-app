import React, { ReactNode } from 'react';
import Navbar from './Navbar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Navbar />
    {children}
  </>
);

export default Layout;
