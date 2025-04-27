'use client';

import Link from 'next/link';

interface FormBreadcrumbProps {
  items: {
    label: string;
    href?: string; // se não tiver href, é o item atual
  }[];
}

export function FormBreadcrumb({ items }: FormBreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex space-x-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:text-gray-700 underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{item.label}</span>
            )}
            {idx < items.length - 1 && (
              <span className="px-2">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
