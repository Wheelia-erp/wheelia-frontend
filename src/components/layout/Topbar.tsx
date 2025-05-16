'use client';

import LogoWheelia from '@/assets/logo-wheelia.svg';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import backendApi from '@/lib/backendApi';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function TopBar() {
  const { user } = useCurrentUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await backendApi.post('/auth/logout');

      if (response.status === 201) {
        toast.success('Você foi desconectado com sucesso.');
        router.push('/login');
      } else {
        throw new Error('Falha ao fazer logout. Tente novamente.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: Error | any) {
      toast.error(error?.message || 'Erro ao fazer logout.');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-30 h-16 flex justify-between items-center px-4 md:px-6 bg-[#1E293B] text-white shadow">
      <div className="flex items-left space-x-2">
        <Image
          src={LogoWheelia}
          alt="Wheelia"
          height={32}
          width={180}
          priority
          className="hidden md:block" // Exibe o logo apenas em telas maiores
        />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium truncate max-w-[150px] md:max-w-[200px]">
          {user?.name ?? user?.email}
        </span>
        <button
          onClick={handleLogout}
          className="p-2 rounded hover:bg-gray-700 transition md:text-sm flex items-center space-x-1"
          aria-label="Logout"
        >
          <LogOut size={20} />
          <span className="hidden md:inline">Sair</span>
        </button>
      </div>
    </div>
  );
}
