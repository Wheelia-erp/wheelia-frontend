'use client';

import { QuoteEntity, QuoteItemEntity } from "../entity/quote.entity";
import { useEffect, useState } from "react";
import GenericTable from "@/components/shared/table/GenericTable";
import { useForm } from "react-hook-form";
import { currencyFormat } from "@/lib/utils";

interface QuoteItemsTableProps {
  quoteItems: QuoteItemEntity[];
  loading?: boolean;  
  form?: ReturnType<typeof useForm<QuoteEntity>>;
  readOnly?: boolean;
}

export default function QuoteItemsTable(props: QuoteItemsTableProps) {
  const { quoteItems, loading } = props;  
  
  const [items, setItems] = useState<QuoteItemEntity[]>(quoteItems ?? []);

  const [selectedItem, setSelectedItem] = useState(false); 

  useEffect(() => {
    setItems(quoteItems ?? []);
  }, [quoteItems]);

  return (          
    <GenericTable<QuoteItemEntity>
      onRowClick={() => setSelectedItem(!selectedItem)}
      selected={selectedItem}
      loading={loading}
      data={items}
      page={1}
      pageSize={10}
      totalItems={items.length}
      columns={[
        {
          label: 'Código do produto',
          field: 'product',
          format: (product) => product.code + ' - ' + product.name,
        },
        { label: 'Descrição', field: 'description' },
        {
          label: 'Valor Unitário',
          field: 'unitPrice',
          format: (value) => currencyFormat(value),
        },
        { label: 'Quantidade', field: 'quantity' },
        {
          label: 'Desconto',
          field: 'discount',
          format: (value) => currencyFormat(value),
        },
        {
          label: 'Total',
          field: 'total',
          format: (value) => currencyFormat(value),
        },
      ]}
    />
 
  );
}