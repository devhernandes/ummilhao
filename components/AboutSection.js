// components/AboutSection.tsx
import React from 'react';
import Link from 'next/link';
import styles from '../styles/AboutSection.module.css';

interface AboutSectionProps {
  // Adicione aqui quaisquer props esperadas, se necessário
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section className={styles.aboutSection}>
      <h2>Mais Que Pixels: Um Portefólio Vivo em Node.js e Next.js</h2>
      <p>
        Este projeto vai além da venda de pixels. É uma demonstração transparente das minhas competências em desenvolvimento web full-stack, utilizando tecnologias modernas como Node.js para o backend e Next.js (React) para um frontend interativo. Quer saber como a grelha funciona, como os pagamentos são processados ou como os pixels são atualizados? Explore o 'making of' no nosso blog técnico.
      </p>
      <Link href="/sobre-o-projeto" className={styles.aboutLink}>
        Explorar o 'Making Of'
      </Link>
    </section>
  );
};

export default AboutSection;