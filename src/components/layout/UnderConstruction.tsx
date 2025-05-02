'use client';

import { AlertTriangle } from 'lucide-react';

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10 text-muted-foreground">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-2xl font-semibold">Página em construção</h1>
      <p className="mt-2 text-sm text-gray-500">Estamos trabalhando para disponibilizar esta funcionalidade em breve.</p>
    </div>
  );
}
