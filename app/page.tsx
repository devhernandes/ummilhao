"use client";

import Head from 'next/head';
import Layout from '../components/layout';
import CallToAction from '../components/CallToAction';
import { PixelGrid } from '../components/PixelGrid'; // Certifique-se de que o caminho e a tipagem estão corretos
import AboutSection from '../components/AboutSection';
import styles from '../styles/Home.module.css'; // Para estilos específicos da página
import type { Pixel } from '../components/PixelGrid';

import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [pixelsVendidos, setPixelsVendidos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resPixels = await fetch('/api/pixels');
        const pixelData = await resPixels.json();
        setPixels(pixelData);

        const resStats = await fetch('/api/stats/pixels-vendidos');
        const statsData = await resStats.json();
        setPixelsVendidos(statsData.count);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout>
      <Head>
        {/* 1. Título da Página (Browser Tab) */}
        <title>Um Milhão de Pixels PT | O Seu Espaço na Web Portuguesa</title>
        <meta name="description" content="Compre o seu pixel na web portuguesa. Deixe a sua marca e veja como este site foi construído com Node.js & Next.js!" />
        {/* Add outras meta tags relevantes (Open Graph, etc.) */}
      </Head>

      <main className={styles.mainContent}>
        {/* 4. Área de Conteúdo Principal */}
        <div className={styles.contentWrapper}> {/* Container principal */}

          {/* Secção da Grelha de Pixels */}
          <PixelGrid pixels={pixels} />

        </div>

        {/* Container secundário */}
        <div className={styles.secondaryContainer}> {/* Novo container */}

          {/* Secção de Informação e CTA */}
          <CallToAction pixelsVendidos={pixelsVendidos} totalPixels={1000000} />

          {/* 5. Secção "Sobre o Projeto" */}
          <AboutSection />

        </div>
      </main>
    </Layout>
  );
}