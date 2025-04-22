'use client';

import Image from 'next/image';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col justify-between">      

      {/* Conteúdo central */}
      <main className="flex flex-col items-center justify-center text-center px-4">
        <Image
          src="/wheelia-logo.png" // substitua pela sua logo leve
          alt="Wheelia Logo"
          width={800}
          height={600}
          className="w-40 mb-6"
        />

        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Gestão simples e inteligente de contratos recorrentes
        </h2>
        <p className="text-gray-600 max-w-xl mb-6">
          Plataforma multitenant com foco em recorrência, automação e experiência.
        </p>

        
        <a
          href="/login"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          Ir para o Dashboard
        </a>
        

      </main>

      {/* Rodapé */}
      <footer className="text-center text-sm text-gray-400 p-4">
        &copy; {new Date().getFullYear()} Wheelia. Todos os direitos reservados.
      </footer>
    </div>
  );
}
