// components/Navbar.tsx
// Renomeado para TypeScript (.tsx) e adicionado suporte a tipos
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

interface NavbarProps {
  // Adicione aqui quaisquer props esperadas, se necessário
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link href="/">Início</Link></li>
        <li><Link href="/sobre">Sobre</Link></li>
        <li><Link href="/contato">Contato</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;