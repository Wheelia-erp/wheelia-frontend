import Sidebar from './Sidebar';
import TopBar from './Topbar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <main>{children}</main>
      </div>
    </div>
  );
}
