export default function FirstContainer() {
  return (
    <section className="max-w-4xl mx-auto mb-16 rounded-xl overflow-hidden">
      <div className="bg-purple-900/30 backdrop-blur-sm p-8 rounded-xl border border-purple-800/50">
        <h2 className="text-3xl font-bold text-center mb-6">Possua um Pedaço da História Digital Portuguesa!</h2>

        <p className="text-center mb-8 text-purple-100">
          Inspirado no fenômeno global 'The Million Dollar Homepage', o 'Um Milhão de Pixels PT' oferece 1.000.000
          de pixels na web portuguesa. Cada pixel custa apenas 1 Euro. Anuncie o seu website, projeto, ou
          simplesmente deixe a sua marca digital para a posteridade!
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="bg-purple-950/50 p-6 rounded-lg border border-purple-800/50 flex-1">
            <div className="mb-4">
              <span className="font-semibold">Preço:</span> 1€ por Pixel
            </div>
            <div className="mb-4">
              <span className="font-semibold">Compra Mínima:</span> Bloco de 10x10 Pixels (100€)
            </div>
            <div className="mb-4">
              <span className="font-semibold">Total de Pixels:</span> 1 000 000
            </div>
            <div className="mb-4">
              <span className="font-semibold">Pixels Vendidos:</span> 0 / 1 000 000
            </div>
          </div>

          <div className="flex-shrink-0">
            <button className="bg-white text-[#0A0A20] px-8 py-6 text-lg rounded-md">
              Comprar Pixels Agora!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}