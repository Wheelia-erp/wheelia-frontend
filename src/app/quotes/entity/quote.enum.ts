export const QuoteStatuses = {
  DRAFT: { value: "draft", label: "Rascunho" },
  SENT: { value: "sent", label: "Enviado" },
  ACCEPTED: { value: "accepted", label: "Aceito" },
  REJECTED: { value: "rejected", label: "Rejeitado" },
  CANCELLED: { value: "cancelled", label: "Cancelado" },
  EXPIRED: { value: "expired", label: "Expirado" },
};
export type QuoteStatus =
  (typeof QuoteStatuses)[keyof typeof QuoteStatuses]["value"];

export const LifeCycleTypes = {
  ONE_TIME: { value: "one_time", label: "Avulso" },
  RECURRING: { value: "recurring", label: "Recurrente" },
};
export type LifeCycleType =
  (typeof LifeCycleTypes)[keyof typeof LifeCycleTypes]["value"];

export const BillingPeriods = {
  MONTHLY: { value: "monthly", label: "Mensal" },
  BIMONTHLY: { value: "bimonthly", label: "Bimestral" },
  QUARTERLY: { value: "quarterly", label: "Trimestral" },
  SEMIANNUAL: { value: "semiannual", label: "Semestral" },
  ANNUALLY: { value: "annually", label: "Anual" },
};
export type BillingPeriod =
  (typeof BillingPeriods)[keyof typeof BillingPeriods]["value"];

export const PaymentForms = {
  UPFRONT: { value: "upfront", label: "À vista" },
  INSTALLMENT: { value: "installment", label: "Parcelado" },
};
export type PaymentForm =
  (typeof PaymentForms)[keyof typeof PaymentForms]["value"];

export const PaymentMethods = {
  CREDIT_CARD: { value: "credit_card", label: "Cartão de Crédito" },
  DEBIT_CARD: { value: "debit_card", label: "Cartão de Débito" },
  PIX: { value: "pix", label: "PIX" },
  CASH: { value: "cash", Label: "Dinheiro" },
};
export type PaymentMethod =
  (typeof PaymentMethods)[keyof typeof PaymentMethods]["value"];
