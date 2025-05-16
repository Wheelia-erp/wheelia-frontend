import { FormInput } from "@/components/form/FormInput";
import { currencyFormat } from "@/lib/utils";
import React from "react";

export default function QuoteTotalDisplay({ total }: { total: number }) {
  return (    
      <FormInput
        id="valor_total_orcamento"
        value={currencyFormat(total ?? 0)}
        readOnly
        style={{
          fontSize: '1.6rem',
          fontWeight: 'bold',
          color: '#2F855A',
          textAlign: 'right',
          backgroundColor: '#F0FFF4',
          borderColor: '#9AE6B4',
          padding: '12px 15px',
          borderRadius: '8px',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      />    
  );
}
