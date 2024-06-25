import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
