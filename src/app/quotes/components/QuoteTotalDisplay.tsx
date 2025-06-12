import { FormLabel } from "@/components/form/FormLabel";
import { currencyFormat } from "@/lib/utils";

export default function QuoteTotalDisplay({ total }: { total: number }) {
  return (
    <div className="flex flex-col items-end justify-center">
      <FormLabel
        className="text-gray-500 text-sm text-gray-600 dark:text-gray-400 bold"
        style={{ fontSize: '0.8rem' }}
      >
        Valor total:
      </FormLabel>
      <FormLabel
        id="valor_total_orcamento"
        className="rounded-lg bg-green-100 border border-green-200 p-2"
        style={{
          fontSize: '1.6rem',
          fontWeight: 'bold',
          color: '#2F855A',
          textAlign: 'right',
        }}
      >
        {currencyFormat(total)}
      </FormLabel>
    </div>
  );
}
