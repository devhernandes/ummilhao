"use client";

import { useRef, useEffect, useState, FC, ReactNode } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  scatteredColor: string;
  life: number;
  isRightSide: boolean; // Generalizado de isAWS
}

interface InteractiveParticlesProps {
  text?: string;
  baseFontSize?: number;
  mobileFontSize?: number;
  baseParticleCount?: number;
  maxInteractionDistance?: number;
  particleInteractionForce?: number;
  defaultParticleColor?: string;
  scatteredColorLeft?: string;
  scatteredColorRight?: string;
  canvasBackgroundColor?: string;
  showInfoText?: boolean;
  infoTextContent?: ReactNode;
  containerClassName?: string;
  canvasClassName?: string;
  mobileBreakpoint?: number;
}

const InteractiveParticles: FC<InteractiveParticlesProps> = ({
  text = "1 milhão de pixel",
  baseFontSize = 64,
  mobileFontSize = 36,
  baseParticleCount = 7000,
  maxInteractionDistance = 240,
  particleInteractionForce = 60,
  defaultParticleColor = "white",
  scatteredColorLeft = "#00DCFF",
  scatteredColorRight = "#FF9900",
  canvasBackgroundColor = "black",
  showInfoText = true,
  infoTextContent = (
    <p className="font-mono text-gray-400 text-xs sm:text-base md:text-sm ">
      1 milhão de pixel{" "}
      <a
        href="#"
        className="invite-link text-gray-300 hover:text-cyan-400 transition-colors duration-300"
        onClick={(e) => e.preventDefault()} // Evitar navegação padrão
      >
        interativos
      </a>{" "}
      <span>com</span>
      <span className="transition-colors duration-300"> partículas</span>
    </p>
  ),
  containerClassName = "relative w-full h-dvh flex flex-col items-center justify-center",
  canvasClassName = "w-full h-full absolute top-0 left-0 touch-none",
  mobileBreakpoint = 768,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let textImageData: ImageData | null = null;
    let animationFrameId: number;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    function createTextImage(): void { // Não precisa retornar o scale se não for usado
      if (!ctx || !canvas) return;

      ctx.fillStyle = defaultParticleColor;
      ctx.save();

      const fontSize = isMobile ? mobileFontSize : baseFontSize;
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      ctx.restore();

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function createParticle(): Particle | null {
      if (!ctx || !canvas || !textImageData) return null;

      const data = textImageData.data;

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          const isRightSide = x > canvas.width / 2;
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: defaultParticleColor,
            scatteredColor: isRightSide ? scatteredColorRight : scatteredColorLeft,
            isRightSide: isRightSide,
            life: Math.random() * 100 + 50,
          };
        }
      }
      return null;
    }

    function initParticles() {
      createTextImage();
      const screenRatio = Math.sqrt((canvas.width * canvas.height) / (1920 * 1080));
      const minParticles = Math.max(1000, Math.floor(baseParticleCount * 0.2));
      const maxParticles = Math.min(15000, Math.floor(baseParticleCount * 2));
      const dynamicParticleCount = Math.max(
        minParticles,
        Math.min(maxParticles, Math.floor(baseParticleCount * screenRatio))
      );
      particles = [];
      for (let i = 0; i < dynamicParticleCount; i++) {
        const particle = createParticle();
        if (particle) particles.push(particle);
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = canvasBackgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mousePositionRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const transitionSpeed = 0.15; // Velocidade de transição mais suave
        const maxForce = 0.7; // Limita a força máxima da interação

        if (distance < maxInteractionDistance && (isTouchingRef.current || !("ontouchstart" in window && navigator.maxTouchPoints > 0))) {
          const force = Math.min(maxForce, (maxInteractionDistance - distance) / maxInteractionDistance);
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * particleInteractionForce;
          const moveY = Math.sin(angle) * force * particleInteractionForce;
          const targetX = p.baseX - moveX;
          const targetY = p.baseY - moveY;
          
          p.x += (targetX - p.x) * transitionSpeed;
          p.y += (targetY - p.y) * transitionSpeed;
          ctx.fillStyle = p.scatteredColor;
        } else {
          p.x += (p.baseX - p.x) * transitionSpeed;
          p.y += (p.baseY - p.y) * transitionSpeed;
          ctx.fillStyle = p.color;
        }

        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.life--;
        if (p.life <= 0) {
          const newParticle = createParticle();
          if (newParticle) {
            particles[i] = newParticle;
          } else {
            particles.splice(i, 1);
            i--;
          }
        }
      }

      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
      );
      let attempts = 0; // Para evitar loop infinito
      while (particles.length < targetParticleCount && attempts < 500) {
        const newParticle = createParticle();
        if (newParticle) {
          particles.push(newParticle);
        } else {
          // Se não conseguir criar partículas (ex: texto muito pequeno ou canvas pequeno), sair do loop
          break;
        }
        attempts++;
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    updateCanvasSize(); // Chamar inicialmente
    initParticles();
    animate();

    const handleResize = () => {
      updateCanvasSize();
      initParticles(); // Recriar imagem do texto e partículas
    };

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y };
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchStart = () => { isTouchingRef.current = true; };
    const handleTouchEnd = () => {
      isTouchingRef.current = false;
      // Resetar para uma posição "neutra" ou central para não deixar partículas espalhadas
      mousePositionRef.current = { x: -maxInteractionDistance, y: -maxInteractionDistance };
    };
    const handleMouseLeave = () => {
       // Apenas resetar se não for um dispositivo de toque que acabou de terminar o toque
      if (!("ontouchstart" in window && navigator.maxTouchPoints > 0)) {
         mousePositionRef.current = { x: -maxInteractionDistance, y: -maxInteractionDistance };
      }
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) { // Verificar se canvas ainda existe ao desmontar
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    text, baseFontSize, mobileFontSize, baseParticleCount, maxInteractionDistance,
    particleInteractionForce, defaultParticleColor, scatteredColorLeft,
    scatteredColorRight, canvasBackgroundColor, mobileBreakpoint, isMobile // isMobile é estado derivado, mas afeta o setup inicial
  ]);

  return (
    <div className={containerClassName} style={{ backgroundColor: canvasBackgroundColor }}> {/* Aplicando background color via style inline */}
      <canvas
        ref={canvasRef}
        className={canvasClassName}
        aria-label={`Interactive particle effect displaying the text: ${text}`}
      />
      {showInfoText && infoTextContent && (
        <div className="absolute bottom-[20px] sm:bottom-[50px] md:bottom-[70px] lg:bottom-[100px] text-center z-10 w-full px-4">
          {infoTextContent}
        </div>
      )}
    </div>
  );
};

export default InteractiveParticles;