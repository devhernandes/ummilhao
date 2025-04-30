"use client";

// components/CallToAction.tsx
import React from 'react';
import Link from 'next/link';
import styles from '../styles/CallToAction.module.css';

interface CallToActionProps {
  pixelsVendidos: number;
  totalPixels: number;
}

const CallToAction: React.FC<CallToActionProps> = ({ pixelsVendidos, totalPixels }) => {
  // Formatar números para melhor leitura
  const formatNumber = (num: number) => num.toLocaleString('pt-PT');

  return (
    <section className={styles.ctaSection}>
      <h2>Possua um Pedaço da História Digital Portuguesa!</h2>
      <p>
        Inspirado no fenómeno global 'The Million Dollar Homepage', o 'Um Milhão de Pixels PT' oferece 1.000.000 de pixels na web portuguesa. Cada pixel custa apenas 1 Euro. Anuncie o seu website, projeto, ou simplesmente deixe a sua marca digital para a posteridade!
      </p>
      <div className={styles.keyInfo}>
        <p><strong>Preço:</strong> 1€ por Pixel</p>
        <p><strong>Compra Mínima:</strong> Bloco de 10x10 Pixels (100€)</p>
        <p><strong>Total de Pixels:</strong> {formatNumber(totalPixels)}</p>
        <p>
          <strong>Pixels Vendidos:</strong>
          <span className={styles.dynamicCounter}> {formatNumber(pixelsVendidos)} </span> / {formatNumber(totalPixels)}
        </p>
      </div>
      <Link href="/comprar-pixels" className={styles.ctaButton}>
        Comprar Pixels Agora!
      </Link>
    </section>
  );
};

export default CallToAction;