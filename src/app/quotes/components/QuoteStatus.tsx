import { FormCard } from "@/components/form/FormCard";
import { FormStepProgress } from "@/components/form/FormStepProgress";
import { CheckCircle, Pencil, Send, XCircle } from "lucide-react";
import { QuoteStatuses } from "../entity/quote.enum";

interface QuoteStatusViewProps {
  quoteStatus: string;  
}

export default function QuoteStatusView ({ quoteStatus }: QuoteStatusViewProps) {

  const steps = [
    {
      label: 'Em elaboração',
      icon: <Pencil size={24} />,
      color: '#6B7280', // Cinza
      date: '11/05/2025',
      current: quoteStatus === QuoteStatuses.DRAFT.value,
    },
    {
      label: 'Aguardando aprovação',
      icon: <Send size={24} />,
      color: '#F59E0B', // Amarelo
      current: quoteStatus === QuoteStatuses.SENT.value,
    },
  ];
  
  if (quoteStatus === "rejected") {
    steps.push({
      label: "Reprovado",
      icon: <XCircle size={24} />,
      color: "#EF4444", // Vermelho
      current: quoteStatus === QuoteStatuses.REJECTED.value,
    });
  } else {
    steps.push({
      label: "Aprovado",
      icon: <CheckCircle size={24} />,
      color: "#10B981", // Verde
      current: quoteStatus === QuoteStatuses.ACCEPTED.value,
    });
  }

  return (
    <FormCard className="w-full">
      <FormStepProgress steps={steps} />
    </FormCard>
  );

}