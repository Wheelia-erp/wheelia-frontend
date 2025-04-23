'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  CreditCard,
  DollarSign,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
}

const navItems = [
  { label: 'Dashboard', icon: Home, href: '/dashboard' },
  { label: 'Clientes', icon: Users, href: '/customers' },
  { label: 'Assinaturas', icon: CreditCard, href: '/subscriptions' },
  { label: 'Pagamentos', icon: DollarSign, href: '/payments' },
  {
    label: 'Configurações',
    icon: Settings,
    children: [
      { label: 'Dados da empresa', href: '/settings/tenant' },
      { label: 'Usuários', href: '/settings/users' },
    ],
  },
];

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();

  const [openSection, setOpenSection] = useState<string | null>(() => {
    const match = navItems.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.href))
    );
    return match?.label || null;
  });

  return (
    <aside
      className={cn(
        'transition-all duration-300 bg-[#1E293B] text-white pt-16 shadow h-screen',
        collapsed ? 'w-16 px-2' : 'w-60 px-4 py-6'
      )}
    >
      <nav className="space-y-2 text-sm">
        {navItems.map(({ label, icon: Icon, href, children }) => {
          const isActive = href && pathname.startsWith(href);
          const isOpen = openSection === label;

          if (!children) {
            return (
              <Link
                key={label}
                href={href!}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-md transition',
                  isActive
                    ? 'bg-white/20 text-white font-semibold'
                    : 'hover:bg-white/10 text-white/80',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon size={18} />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          }

          return (
            <div key={label}>
              <button
                onClick={() => setOpenSection(isOpen ? null : label)}
                className={cn(
                  'flex items-center w-full space-x-3 px-3 py-2 rounded-md transition',
                  (isOpen || children.some((c) => pathname.startsWith(c.href)))
                    ? 'bg-white/10 text-white font-semibold'
                    : 'hover:bg-white/10 text-white/80',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon size={18} />
                {!collapsed && <span className="flex-1 text-left">{label}</span>}
                {!collapsed && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
              </button>

              {!collapsed && isOpen && (
                <AnimatePresence initial={false}>
                  <motion.div
                    key="submenu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-6 mt-1 overflow-hidden"
                  >
                    <div className="space-y-1">
                      {children.map((child) => {
                        const isChildActive = pathname.startsWith(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-3 py-1 rounded-md text-sm',
                              isChildActive
                                ? 'bg-white/20 text-white font-medium'
                                : 'hover:text-white/90 text-white/70'
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
