'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Se já usa shadcn, se não te mando um select básico
import { Button } from '@/components/ui/button'; // Se ainda não usa, crio uma versão leve

interface PaginationToolbarProps {
  page: number;
  pageSize: number;
  totalItems: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (newPage: number) => void;
  // eslint-disable-next-line no-unused-vars
  onPageSizeChange: (newPageSize: number) => void;
}

export function PaginationToolbar({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationToolbarProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 px-6 py-3 bg-white border-t">
      {/* Quantidade de registros */}
      <div className="text-sm text-gray-600">
        {totalItems > 0
          ? `Mostrando ${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, totalItems)} de ${totalItems} registros`
          : 'Nenhum registro encontrado'}
      </div>

      {/* Controle de página e tamanho */}
      <div className="flex items-center gap-4">
        {/* Seletor de pageSize */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Itens por página:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botões de navegação */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={page <= 1}
          >
            Anterior
          </Button>
          <span className="text-sm">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={page >= totalPages}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
