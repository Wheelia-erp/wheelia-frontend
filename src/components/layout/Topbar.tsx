'use client';

import { Menu, ChevronsRight } from 'lucide-react';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';

interface TopBarProps {
  toggleSidebar: () => void;
  collapsed: boolean;
}

export default function TopBar({ toggleSidebar, collapsed }: TopBarProps) {
  const { user } = useCurrentUser();
  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-16 flex justify-between items-center px-6 bg-[#1E293B] text-white shadow">
      <button
        className="hover:text-blue-300 transition"
        onClick={toggleSidebar}
      >
        {collapsed ? (
          <ChevronsRight className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>
      <div className="text-sm font-medium truncate max-w-[200px]">
        {user?.name ?? user?.email }
      </div>
    </div>
  );
}
