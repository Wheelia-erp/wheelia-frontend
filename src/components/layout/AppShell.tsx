'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './Topbar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen text-gray-900">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col">
      <TopBar toggleSidebar={() => setSidebarCollapsed((prev) => !prev)} collapsed={sidebarCollapsed} />
        <main className="bg-gray-50 p-6 pt-20 min-h-[calc(100vh-64px)]">{children}</main>
      </div>
    </div>
  );
}
