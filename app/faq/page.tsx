"use client";

import InteractiveParticles from "../../components/interactiveParticles";

export default function Faq() {
  return (
    <main>
      {/* Exemplo com props padrão */}
      {/* <InteractiveParticles /> */}

      {/* Exemplo com customização */}
      <InteractiveParticles
        text="1 milhão de pixels"
        baseFontSize={70}
        mobileFontSize={30}
        scatteredColorLeft="rgb(0, 220, 255)"
        scatteredColorRight="rgb(120, 80, 255)"
        defaultParticleColor="rgba(200, 200, 200, 0.8)"
        canvasBackgroundColor="#111827" // Um cinza escuro
        baseParticleCount={6000}
        infoTextContent={
          <p className="font-sans text-sm text-slate-300">
            Descubra o poder das partículas com{" "}
            <strong className="text-sky-400">Next.js</strong>!
          </p>
        }
      />
    </main>
  );
}