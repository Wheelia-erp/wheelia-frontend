'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  CreditCard,
  DollarSign,
  Settings,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const [hovering, setHovering] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const isExpanded = hovering || !collapsed;

  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => setHovering(false), 200);
  };

  // Sincronizar openSection com pathname
  useEffect(() => {
    const match = navItems.find(item =>
      item.children?.some(child => pathname.startsWith(child.href))
    );
    if (match) {
      setOpenSection(match.label);
    } else {
      setOpenSection(null);
    }
  }, [pathname]);

  return (
    <motion.aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={false}
      animate={{ width: isExpanded ? 250 : 74 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed top-16 left-0 h-[calc(100vh-64px)] bg-[#1E293B] text-white pt-6 shadow-lg z-40 overflow-hidden"
    >
      {/* Chevron lateral */}
      <div className="absolute right-0 top-0 h-full w-5 bg-[#0F172A] rounded-l-lg hover:bg-white/10 transition-colors duration-200 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex items-center justify-center w-full h-full text-white hover:text-blue-300 transition"
          onClick={() => window.dispatchEvent(new CustomEvent('toggleSidebar'))}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Navegação */}
      <nav className="relative space-y-2 pl-1 pr-6 text-sm">
        {navItems.map(({ label, icon: Icon, href, children }) => {
          const isActive = href && pathname.startsWith(href);
          const isOpen = openSection === label;

          if (!children) {
            return (
              <Link
                key={label}
                href={href!}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200',
                  isActive
                    ? 'bg-white/20 text-white font-semibold'
                    : 'hover:bg-white/10 text-white/80',
                  !isExpanded && 'justify-center px-2'
                )}
              >
                <Icon size={20} />
                <motion.span
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'whitespace-nowrap overflow-hidden transition-all duration-300',
                    !isExpanded && 'w-0 opacity-0',
                    isExpanded && 'w-auto opacity-100'
                  )}
                >
                  {label}
                </motion.span>
              </Link>
            );
          }

          return (
            <div key={label}>
              <button
                onClick={() => {
                  if (isExpanded) {
                    setOpenSection(isOpen ? null : label);
                  }
                }}
                className={cn(
                  'flex items-center w-full space-x-3 px-3 py-2 rounded-md transition-colors duration-200',
                  (isOpen || children.some(child => pathname.startsWith(child.href)))
                    ? 'bg-white/10 text-white font-semibold'
                    : 'hover:bg-white/10 text-white/80',
                  !isExpanded && 'justify-center px-2'
                )}
              >
                <Icon size={20} />
                <motion.span
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'whitespace-nowrap overflow-hidden transition-all duration-300',
                    !isExpanded && 'w-0 opacity-0',
                    isExpanded && 'w-auto opacity-100'
                  )}
                >
                  {label}
                </motion.span>
                {isExpanded && (
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                )}
              </button>

              {/* Submenu se expandido */}
              {isExpanded && isOpen && (
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
                              'block px-3 py-1 rounded-md text-sm transition-colors duration-200',
                              isChildActive
                                ? 'bg-white/20 text-white font-medium'
                                : 'hover:bg-white/10 text-white/70'
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
    </motion.aside>
  );
}
