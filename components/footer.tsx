import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto py-8 bg-[#0a0a20] border-t border-[#1a1a3a]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <Link href="/termos" className="text-gray-300 hover:text-white mx-2">
              Termos e Condições
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/privacidade" className="text-gray-300 hover:text-white mx-2">
              Política de Privacidade
            </Link>
          </div>
          <div className="text-gray-400 text-sm mb-4 text-center">
            © 2025 Um Milhão de Pixels PT. Todos os direitos reservados.
          </div>
          <div className="text-gray-500 text-xs max-w-2xl text-center">
            Disclaimer: Não nos responsabilizamos pelo conteúdo ou funcionalidade dos websites externos ligados a
            partir dos pixels comprados.
          </div>
        </div>
      </div>
    </footer>
  );
}