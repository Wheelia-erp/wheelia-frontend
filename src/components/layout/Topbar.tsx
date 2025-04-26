'use client';

import Image from 'next/image';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import LogoWheelia from '@/assets/logo-wheelia.svg';

export default function TopBar() {
  const { user } = useCurrentUser();
  return (
    <div className="fixed top-0 left-0 right-0 z-30 h-16 flex justify-between items-center px-6 bg-[#1E293B] text-white shadow">
      <div className="flex items-left space-x-2">
        <Image
          src={LogoWheelia}
          alt="Wheelia"
          height={32}
          width={200}
          priority
        />
      </div>
      <div className="text-sm font-medium truncate max-w-[200px]">
        {user?.name ?? user?.email}
      </div>
    </div>
  );
}
