'use client';

import backendApi from '@/lib/backendApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao fazer login');
      setIsSubmitting(false);
    }
  };

  return (  

    <div className="min-h-screen flex bg-blue-50">
      <div className="fixed top-0 left-0 right-0 z-30 h-16 flex justify-between items-center px-6 bg-[#1E293B] text-white shadow">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-left space-x-2">
            <Image
              src="/logo-wheelia.svg"
              alt="Wheelia"
              height={32}
              width={180}
              priority
            />
          </div>           
        </div>
      </div>      
      

      {/* Lado esquerdo (formulário) */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-8 sm:px-16 py-12">
       
        <div className="mb-8 mt-16">           
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Acesse o Wheelia
          </h1>
          <p className="text-gray-700 text-lg">
            Simplifique o recorrente, potencialize resultados
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border border-gray-200 rounded-md px-4 py-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-gray-200 rounded-md px-4 py-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 font-medium"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
          )}

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Esqueci minha senha
            </a>
          </div>
        </div>
      </div>

      {/* Lado direito (ilustração) */}
      <div className="hidden md:flex w-[60%] items-center justify-center p-8">
        <Image
          src="/wheelia_login_illustration.png"
          alt="Ilustração Wheelia"
          width={800}
          height={600}
          className="max-h-[90vh] w-auto object-contain rounded-lg shadow-sm"
          priority
        />
      </div>
    </div>
  );
}
