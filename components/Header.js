// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Opcional, para o ícone
import Navbar from './Navbar';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        {/* Ícone opcional */}
        {/* <Image src="/images/flag-pt.png" alt="Bandeira de Portugal" width={30} height={20} className={styles.flagIcon} /> */}
        <h1 className={styles.title}>
          <Link href="/">{title}</Link>
        </h1>
      </div>
      <p className={styles.slogan}>
        Compre o seu pixel, deixe a sua marca e veja como este site foi construído com Node.js & Next.js!
      </p>
      <Navbar />
    </header>
  );
};

export default Header;