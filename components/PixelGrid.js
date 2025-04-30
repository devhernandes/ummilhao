"use client";

// Renomeado para TypeScript (.tsx) e adicionado suporte a tipos
import React, { useState, memo } from 'react';
import styles from '../styles/PixelGrid.module.css';

interface Pixel {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  imageUrl: string;
  linkUrl: string;
  hoverText: string;
}

interface PixelGridProps {
  pixels: Pixel[];
}

const PixelGrid: React.FC<PixelGridProps> = memo(function PixelGrid({ pixels }) {
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  const handleMouseEnter = (pixel: Pixel, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pixel.hoverText) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltip({
        visible: true,
        content: pixel.hoverText,
        x: window.scrollX + rect.left + rect.width / 2,
        y: window.scrollY + rect.top - 30,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: '', x: 0, y: 0 });
  };

  const handleClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className={styles.gridSection}>
      <h3>A Grelha (1000x1000 Pixels)</h3>
      <div className={styles.gridContainer}>
        <div className={styles.pixelArea} style={{ width: '1000px', height: '1000px' }}>
          {pixels.map((pixel) => (
            <a
              key={pixel.id}
              href={pixel.linkUrl}
              onClick={(e) => {
                e.preventDefault();
                handleClick(pixel.linkUrl);
              }}
              onMouseEnter={(e) => handleMouseEnter(pixel, e)}
              onMouseLeave={handleMouseLeave}
              className={styles.boughtPixel}
              style={{
                position: 'absolute',
                left: `${pixel.x}px`,
                top: `${pixel.y}px`,
                width: `${pixel.width}px`,
                height: `${pixel.height}px`,
                backgroundImage: `url(${pixel.imageUrl})`,
                backgroundSize: 'cover',
              }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={pixel.hoverText || `Link para pixel ${pixel.id}`}
            />
          ))}
        </div>

        {tooltip.visible && (
          <div
            className={styles.tooltip}
            style={{
              position: 'absolute',
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              transform: 'translateX(-50%)',
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9em' }}>
        (Passe o rato sobre um pixel comprado para ver a descrição, clique para visitar o link)
      </p>
    </section>
  );
});

export default PixelGrid;