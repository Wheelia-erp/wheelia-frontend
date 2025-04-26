'use client';

import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('sidebar-collapsed') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const toggle = () => {
      setCollapsed(prev => {
        sessionStorage.setItem('sidebar-collapsed', (!prev).toString());
        return !prev;
      });
    };

    window.addEventListener('toggleSidebar', toggle);
    return () => window.removeEventListener('toggleSidebar', toggle);
  }, []);

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
