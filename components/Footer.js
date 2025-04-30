// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

interface FooterProps {
  // Adicione aqui quaisquer props esperadas, se necessário
}

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear(); // Pega o ano atual dinamicamente

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <Link href="/termos-e-condicoes">Termos e Condições</Link> |{' '}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>
      </div>
      <div className={styles.copyright}>
        © {currentYear} Um Milhão de Pixels PT. Todos os direitos reservados.
      </div>
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> Não nos responsabilizamos pelo conteúdo ou funcionalidade dos websites externos ligados a partir dos pixels comprados.
      </div>
    </footer>
  );
};

export default Footer;