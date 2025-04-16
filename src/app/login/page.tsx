'use client';

import { useAuth0 } from '@auth0/auth0-react'; // substituiremos por Lucia futuramente

export default function LoginPage() {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) return <p className="p-6">Carregando...</p>;

  return (
    <div className="min-h-screen flex bg-white">
      {/* Lado esquerdo (formulário) */}
      <div className="w-full md:w-[30%] flex flex-col justify-center px-8 sm:px-16 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Acesse o Wheelia</h1>
          <p className="text-gray-500">Plataforma inteligente de gestão recorrente</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input type="checkbox" className="mr-2" /> Manter conectado
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Esqueci minha senha
            </a>
          </div>

          <button
            onClick={() => loginWithRedirect()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Ainda não tem conta?{' '}
          <button
            onClick={() =>
              loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })
            }
            className="text-blue-600 hover:underline"
          >
            Crie uma agora
          </button>
        </p>
      </div>

      {/* Lado direito (imagem/estilo leve) */}
      <div className="hidden md:flex w-[70%] bg-blue-50 p-10 items-center justify-center">
        <img 
          src="/woman_dashboard_wheelia.webp" 
          alt="Ilustração Wheelia" 
          className="h-[90vh] w-auto object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
