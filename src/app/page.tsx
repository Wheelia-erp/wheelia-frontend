'use client';

import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';

export default function HomePage() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col justify-between">
      {/* Cabeçalho */}
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">🚀 Wheelia</h1>
        {isAuthenticated && (
          <button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
            className="text-sm text-red-500 underline"
          >
            Sair
          </button>
        )}
      </header>

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

        {!isAuthenticated ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Acessar minha conta
            </button>

            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: 'signup',
                  },
                })
              }
              className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition"
            >
              Criar conta
            </button>
          </div>
        ) : (
          <a
            href="/dashboard"
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Ir para o Dashboard
          </a>
        )}

      </main>

      {/* Rodapé */}
      <footer className="text-center text-sm text-gray-400 p-4">
        &copy; {new Date().getFullYear()} Wheelia. Todos os direitos reservados.
      </footer>
    </div>
  );
}
