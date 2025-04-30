// Renomeado para TypeScript (.tsx) e adicionado suporte a tipos
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header title="Um Milhão de Pixels PT" />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;