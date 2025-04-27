'use client';

import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useHydrated } from '@/hooks/useHydrated';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const hydrated = useHydrated();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    const initialCollapsed = sessionStorage.getItem('sidebar-collapsed') === 'true';
    setCollapsed(initialCollapsed);

    const toggle = () => {
      setCollapsed(prev => {
        sessionStorage.setItem('sidebar-collapsed', (!prev).toString());
        return !prev;
      });
    };

    window.addEventListener('toggleSidebar', toggle);
    return () => window.removeEventListener('toggleSidebar', toggle);
  }, [hydrated]);

  if (!hydrated) {
    return null;
  }

  return (
    <div>
      <Topbar />
      <Sidebar collapsed={collapsed} />
      <main
        className="pt-16 transition-all duration-300"
        style={{
          paddingLeft: collapsed ? '74px' : '250px',
        }}
      >
        {children}
      </main>
    </div>
  );
}
