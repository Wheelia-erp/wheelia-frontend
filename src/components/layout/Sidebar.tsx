'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, CreditCard, DollarSign, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function Sidebar() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(() => {
    const match = navItems.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.href))
    );
    return match?.label || null;
  });

  return (
    <aside className="w-64 bg-white border-r border-gray-100 px-4 py-6">
      <div className="text-2xl font-bold text-blue-700 mb-8">Wheelia</div>

      <nav className="space-y-2 text-sm text-gray-700">
        {navItems.map(({ label, icon: Icon, href, children }) => {
          const isActive = href && pathname.startsWith(href);
          const isOpen = openSection === label;

          if (!children) {
            return (
              <Link
                key={label}
                href={href!}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          }

          return (
            <div key={label}>
              <button
                onClick={() =>
                  setOpenSection(isOpen ? null : label)
                }
                className={`flex items-center w-full space-x-3 px-3 py-2 rounded-md transition ${
                  isOpen || children.some((c) => pathname.startsWith(c.href))
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span className="flex-1 text-left">{label}</span>
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
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
                            className={`block px-3 py-1 rounded-md text-sm ${
                              isChildActive
                                ? 'text-blue-600 font-medium bg-blue-100'
                                : 'hover:text-blue-700'
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
