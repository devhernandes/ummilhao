export default function SecondContainer() {
  return (
    <section className="max-w-4xl mx-auto mb-16 rounded-xl overflow-hidden">
      <div className="bg-purple-800/20 backdrop-blur-sm p-8 rounded-xl border border-purple-700/30">
        <h2 className="text-3xl font-bold text-center mb-6">
          Mais Que Pixels: Um Portefólio Vivo em Node.js e Next.js
        </h2>

        <p className="text-center mb-8 text-purple-100">
          Este projeto vai além da venda de pixels. É uma demonstração transparente das minhas competências em
          desenvolvimento web full-stack, utilizando tecnologias modernas como Node.js para o backend e Next.js
          (React) para um frontend interativo. Quer saber como a grelha funciona, como os pagamentos são processados
          ou como os pixels são atualizados? Explore o 'making of' no nosso blog técnico.
        </p>

        <div className="flex justify-center">
          <button className="bg-white text-[#0A0A20] px-6 py-2 rounded-md">
            Explorar o 'Making Of'
          </button>
        </div>
      </div>
    </section>
  );
}