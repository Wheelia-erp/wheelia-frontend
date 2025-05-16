'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Topbar */}
      <header className="w-full bg-[#1E293B] text-white py-4">
        <div className="fixed top-0 left-0 right-0 z-30 h-16 flex justify-between items-center px-6 bg-[#1E293B] text-white shadow">
          <div className="flex items-left space-x-2">
            <Image
              src="/logo-wheelia.svg"
              alt="Wheelia"
              height={32}
              width={180}
              priority
            />
          </div>        
          <div>
            <Link 
              href="/login" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Acesse sua conta
            </Link>
          </div>
        </div> 
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Simplifique a Gestão Recorrente do Seu Negócio
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Gerencie orçamentos, obtenha aceite digital e automatize a cobrança com facilidade
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signup" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-center font-medium hover:bg-blue-700 transition"
              >
                Criar Conta Gratuita
              </Link>
              <Link 
                href="/demo" 
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-center font-medium hover:bg-blue-50 transition"
              >
                Agendar Demonstração
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/wheelia_login_illustration.png"
              alt="Gestão recorrente simplificada"
              width={600}
              height={500}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Benefícios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefício 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Orçamentos Simplificados</h3>
              <p className="text-gray-600">
                Crie e envie orçamentos profissionais em minutos, com modelos personalizáveis e campos dinâmicos.
              </p>
            </div>

            {/* Benefício 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Aceite Digital</h3>
              <p className="text-gray-600">
                Obtenha aprovações rápidas com nosso sistema de aceite digital integrado, eliminando burocracia e agilizando negócios.
              </p>
            </div>

            {/* Benefício 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Cobrança Automatizada</h3>
              <p className="text-gray-600">
                Automatize cobranças recorrentes e pontuais, com integração a múltiplos meios de pagamento e gestão completa de recebíveis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Como o Wheelia Transforma Sua Gestão Recorrente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Passo 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">1</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Cadastre seus serviços</h3>
              <p className="text-gray-600">
                Configure seus produtos e serviços com preços, descrições e condições personalizadas.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">2</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Configure regras de cobrança</h3>
              <p className="text-gray-600">
                Defina periodicidade, formas de pagamento e condições especiais para cada tipo de contrato.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">3</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Envie propostas com aceite digital</h3>
              <p className="text-gray-600">
                Compartilhe orçamentos profissionais com seus clientes e receba aprovações digitais instantâneas.
              </p>
            </div>

            {/* Passo 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">4</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Gerencie cobranças automaticamente</h3>
              <p className="text-gray-600">
                Acompanhe pagamentos, recebimentos e tenha total controle sobre sua receita recorrente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Comece a simplificar sua gestão hoje mesmo
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já transformaram sua gestão recorrente com o Wheelia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-center font-medium hover:bg-blue-50 transition"
            >
              Criar Conta Gratuita
            </Link>
            <Link 
              href="/demo" 
              className="border border-white text-white px-8 py-3 rounded-lg text-center font-medium hover:bg-blue-700 transition"
            >
              Agendar Demonstração
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-[#1E293B] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="/logo-wheelia.svg"
                alt="Wheelia Logo"
                width={150}
                height={40}
                className="h-auto"
              />
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Wheelia. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
