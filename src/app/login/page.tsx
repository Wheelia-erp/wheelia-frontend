'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import backendApi from '@/lib/backendApi';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await backendApi.post('/auth/login', { email, password }, { withCredentials: true });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao fazer login');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Lado esquerdo (formulário) */}
      <div className="w-full md:w-[30%] flex flex-col justify-center px-8 sm:px-16 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Acesse o Wheelia</h1>
          <p className="text-gray-500">Plataforma inteligente de gestão recorrente</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}

        <p className="mt-6 text-sm text-gray-600 text-center">
          Ainda não tem conta?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Crie uma agora
          </a>
        </p>
      </div>

      {/* Lado direito (imagem) */}
      <div className="hidden md:flex w-[70%] bg-blue-50 p-10 items-center justify-center">
        <Image
          src="/woman_dashboard_wheelia.webp"
          alt="Ilustração Wheelia"
          width={800}
          height={600}
          className="h-[90vh] w-auto object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
