"use client";

import React, { useState, memo, MouseEvent } from 'react';
import styles from '../styles/PixelGrid.module.css'; // Certifique-se que este arquivo existe

export interface Pixel {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  imageUrl?: string; // imagem é opcional para pixels comprados
  linkUrl?: string; // link é opcional para pixels comprados
  hoverText?: string; // texto de hover é opcional para pixels comprados
  // Adicione outras propriedades se necessário (ex: cor de fundo)
}

interface PixelGridProps {
  pixels: Pixel[]; // Array de pixels já comprados
  onSelectSquare: (squareCoords: { x: number; y: number }) => void; // Callback para quando um quadrado de 10x10 livre é selecionado
}

const PIXEL_SIZE = 10; // Tamanho fixo do quadrado comprável

const PixelGrid: React.FC<PixelGridProps> = memo(function PixelGrid({ pixels, onSelectSquare }) {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
  }>({ visible: false, content: '', x: 0, y: 0 });

  const [hoveredSquare, setHoveredSquare] = useState<{ x: number; y: number } | null>(null);

  // Função para verificar se um quadrado de 10x10 (com base em suas coordenadas de canto superior esquerdo)
  // se sobrepõe com algum pixel já comprado.
  const isSquareOccupied = (squareX: number, squareY: number): boolean => {
    // O quadrado a verificar vai de (squareX, squareY) até (squareX + PIXEL_SIZE, squareY + PIXEL_SIZE)
    const squareRight = squareX + PIXEL_SIZE;
    const squareBottom = squareY + PIXEL_SIZE;

    for (const pixel of pixels) {
      // Um pixel comprado vai de (pixel.x, pixel.y) até (pixel.x + pixel.width, pixel.y + pixel.height)
      const pixelRight = pixel.x + pixel.width;
      const pixelBottom = pixel.y + pixel.height;

      // Verifica se há sobreposição nos eixos X e Y
      const overlapX = squareRight > pixel.x && squareX < pixelRight;
      const overlapY = squareBottom > pixel.y && squareY < pixelBottom;

      // Se houver sobreposição em ambos os eixos, o quadrado está ocupado
      if (overlapX && overlapY) {
        return true;
      }
    }
    // Se nenhum pixel comprado sobrepõe este quadrado, ele não está ocupado
    return false;
  };


  // === Handlers para os Pixels Comprados (os elementos <a> existentes) ===
  const handlePixelMouseEnter = (pixel: Pixel, event: MouseEvent<HTMLAnchorElement>) => {
    if (pixel.hoverText) {
      const rect = event.currentTarget.getBoundingClientRect();
      // Posição do tooltip acima e centralizado no elemento do pixel
      setTooltip({
        visible: true,
        content: pixel.hoverText,
        x: window.scrollX + rect.left + rect.width / 2,
        y: window.scrollY + rect.top - 10, // Posição acima do elemento
      });
    }
    // Ao entrar em um pixel comprado, limpamos o hoveredSquare para não mostrar o indicador 10x10
     setHoveredSquare(null);
  };

  const handlePixelMouseLeave = () => {
    setTooltip({ visible: false, content: '', x: 0, y: 0 });
  };

  const handlePixelClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };


  // === Handlers para a área total da Grelha (o div styles.pixelArea) ===
  const handleGridMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    // Obtém as coordenadas do mouse relativas ao container da grelha
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    // Calcula as coordenadas do canto superior esquerdo do quadrado de 10x10
    // Arredonda para baixo para garantir que sempre caia em um múltiplo de 10
    const squareX = Math.floor(offsetX / PIXEL_SIZE) * PIXEL_SIZE;
    const squareY = Math.floor(offsetY / PIXEL_SIZE) * PIXEL_SIZE;

    // Atualiza o estado do quadrado hovered, apenas se mudou
    if (!hoveredSquare || hoveredSquare.x !== squareX || hoveredSquare.y !== squareY) {
        setHoveredSquare({ x: squareX, y: squareY });
    }

    // Oculta o tooltip dos pixels comprados ao mover o mouse na grelha geral
     setTooltip({ visible: false, content: '', x: 0, y: 0 });
  };

  const handleGridMouseLeave = () => {
    // Ao sair da área da grelha, limpa o quadrado hovered e o tooltip
    setHoveredSquare(null);
    setTooltip({ visible: false, content: '', x: 0, y: 0 });
  };

  const handleGridClick = (event: MouseEvent<HTMLDivElement>) => {
    // Obtém as coordenadas do mouse relativas ao container da grelha
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    // Calcula as coordenadas do canto superior esquerdo do quadrado de 10x10 clicado
    const squareX = Math.floor(offsetX / PIXEL_SIZE) * PIXEL_SIZE;
    const squareY = Math.floor(offsetY / PIXEL_SIZE) * PIXEL_SIZE;

    // Verifica se o quadrado clicado está ocupado por um pixel comprado existente
    const occupied = isSquareOccupied(squareX, squareY);

    if (!occupied) {
      // Se não estiver ocupado, chama a função de callback passada por prop
      onSelectSquare({ x: squareX, y: squareY });
      // Opcional: Pode adicionar um estado de "selecionado" temporário se necessário
    } else {
        // Opcional: Feedback visual ou mensagem se o quadrado já estiver ocupado
        console.log(`Quadrado (${squareX}, ${squareY}) já está ocupado.`);
    }
  };


  return (
    <section className={styles.gridSection}>
      <h3>A Grelha (1000x1000 Pixels)</h3>
      <div className={styles.gridContainer}>
        <div
          className={styles.pixelArea}
          style={{ width: '1000px', height: '1000px', position: 'relative', overflow: 'hidden' }} // Ensure position: relative for absolute children
          onMouseMove={handleGridMouseMove}
          onMouseLeave={handleGridMouseLeave}
          onClick={handleGridClick} // Adiciona o handler de clique para a grelha
        >
          {/* Renderiza os pixels já comprados */}
          {pixels?.map((pixel) => (
            <a
              key={pixel.id}
              href={pixel.linkUrl} // Use linkUrl diretamente, se undefined não navega
              onClick={(e) => {
                 // Não previne o default aqui se o linkUrl for definido,
                 // mas o handler do div pai PRECISA verificar se está sobrepondo
                 // um pixel existente antes de chamar onSelectSquare.
                 // Ou, para simplicidade, deixe o preventDefault AQUI
                 // e remova o onClick do div pai se a intenção é que o link <a>
                 // SEMPRE tenha prioridade.
                 // Vamos manter o onClick no pai para selecionar áreas vazias e
                 // deixar o <a> cuidar do seu link. O handler do pai verificará a sobreposição.
                if (pixel.linkUrl) { // Só previne o default se houver link para este pixel
                    e.preventDefault();
                    handlePixelClick(pixel.linkUrl);
                }
              }}
              onMouseEnter={(e) => handlePixelMouseEnter(pixel, e)}
              onMouseLeave={handlePixelMouseLeave}
              className={styles.boughtPixel} // Mantenha a classe existente
              style={{
                position: 'absolute',
                left: `${pixel.x}px`,
                top: `${pixel.y}px`,
                width: `${pixel.width}px`,
                height: `${pixel.height}px`,
                backgroundImage: pixel.imageUrl ? `url(${pixel.imageUrl})` : undefined, // Use background image se houver URL
                backgroundColor: pixel.imageUrl ? undefined : '#ccc', // Opcional: cor de fundo para pixels sem imagem
                backgroundSize: 'cover',
                cursor: pixel.linkUrl ? 'pointer' : 'default', // Muda o cursor se tiver link
              }}
              target="_blank"
              rel="noopener noreferrer"
              // Adiciona aria-label apenas se hoverText ou linkUrl existir
              aria-label={pixel.hoverText || (pixel.linkUrl ? `Link para pixel ${pixel.id}` : `Pixel ${pixel.id}`)}
              // Remove href se não houver link para evitar navegação indesejada em âncoras vazias
              {...(!pixel.linkUrl && { href: undefined })}
            />
          ))}

          {/* Indicador visual do quadrado de 10x10 atualmente sob o mouse */}
          {hoveredSquare && (
            <div
              className={styles.hoverIndicator} // Estilo a ser definido no CSS Module
              style={{
                position: 'absolute',
                left: `${hoveredSquare.x}px`,
                top: `${hoveredSquare.y}px`,
                width: `${PIXEL_SIZE}px`,
                height: `${PIXEL_SIZE}px`,
                border: '1px solid blue', // Exemplo de estilo visual
                boxSizing: 'border-box', // Inclui a borda dentro do tamanho 10x10
                pointerEvents: 'none', // Garante que este div não bloqueie eventos do mouse no pai
                zIndex: 1, // Garante que fique acima da área base, mas abaixo de pixels comprados (se houver)
              }}
            />
          )}

           {/* Tooltip para pixels comprados (mantido) */}
          {tooltip.visible && (
            <div
              className={styles.tooltip} // Estilo a ser definido no CSS Module
               style={{
                 position: 'absolute',
                 left: `${tooltip.x}px`,
                 top: `${tooltip.y}px`,
                 transform: 'translate(-50%, -100%)', // Posiciona acima e centralizado no X
                 pointerEvents: 'none', // Não interage com o mouse
                 zIndex: 10, // Garante que fique acima de tudo
               }}
             >
               {tooltip.content}
             </div>
           )}

           {/* Opcional: Exibir coordenadas do quadrado hovered (pode ser no tooltip geral ou separado) */}
           {/* Se quiser as coordenadas SEPARADO do tooltip de pixel comprado: */}
           {/*
           {hoveredSquare && !isSquareOccupied(hoveredSquare.x, hoveredSquare.y) && (
              <div
                className={styles.coordinateTooltip} // Estilo a ser definido
                style={{
                  position: 'absolute',
                  left: `${hoveredSquare.x + PIXEL_SIZE / 2}px`,
                  top: `${hoveredSquare.y - 15}px`,
                  transform: 'translateX(-50%)',
                  pointerEvents: 'none',
                  zIndex: 10,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '2px 5px',
                  borderRadius: '3px',
                  fontSize: '0.8em',
                }}
              >
                ({hoveredSquare.x}, {hoveredSquare.y})
              </div>
           )}
           */}


        </div>

        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9em' }}>
           (Passe o rato sobre a grelha para ver a área de 10x10px selecionável, clique em uma área livre para comprar. Passe o rato sobre um pixel comprado para ver a descrição, clique para visitar o link)
        </p>
      </div>
    </section>
  );
});

export default PixelGrid;