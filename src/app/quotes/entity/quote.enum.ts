import { EnumOption } from '@/core/enum/base.enum';

export const QuoteStatuses = {
  DRAFT: { value: 'draft', label: 'Rascunho' } as EnumOption,
  SENT: { value: 'sent', label: 'Enviado' } as EnumOption,
  ACCEPTED: { value: 'accepted', label: 'Aceito' } as EnumOption,
  REJECTED: { value: 'rejected', label: 'Rejeitado' } as EnumOption,
  CANCELLED: { value: 'cancelled', label: 'Cancelado' } as EnumOption,
  EXPIRED: { value: 'expired', label: 'Expirado' } as EnumOption,
};
export type QuoteStatus =
  (typeof QuoteStatuses)[keyof typeof QuoteStatuses]['value'];

export const LifeCycleTypes = {
  ONE_TIME: { value: 'one_time', label: 'Avulso' } as EnumOption,
  RECURRING: { value: 'recurring', label: 'Recorrente' } as EnumOption,
};
export type LifeCycleType =
  (typeof LifeCycleTypes)[keyof typeof LifeCycleTypes]['value'];

export const BillingPeriods = {
  MONTHLY: { value: 'monthly', label: 'Mensal' } as EnumOption,
  BIMONTHLY: { value: 'bimonthly', label: 'Bimestral' } as EnumOption,
  QUARTERLY: { value: 'quarterly', label: 'Trimestral' } as EnumOption,
  SEMIANNUAL: { value: 'semiannual', label: 'Semestral' } as EnumOption,
  ANNUALLY: { value: 'annually', label: 'Anual' } as EnumOption,
};
export type BillingPeriod =
  (typeof BillingPeriods)[keyof typeof BillingPeriods]['value'];

export const PaymentForms = {
  UPFRONT: { value: 'upfront', label: 'À vista' } as EnumOption,
  INSTALLMENT: { value: 'installment', label: 'Parcelado' } as EnumOption,
};
export type PaymentForm =
  (typeof PaymentForms)[keyof typeof PaymentForms]['value'];

export const PaymentMethods = {
  CREDIT_CARD: {
    value: 'credit_card',
    label: 'Cartão de Crédito',
  } as EnumOption,
  DEBIT_CARD: { value: 'debit_card', label: 'Cartão de Débito' } as EnumOption,
  PIX: { value: 'pix', label: 'PIX' } as EnumOption,
  CASH: { value: 'cash', label: 'Dinheiro' } as EnumOption,
};
export type PaymentMethod =
  (typeof PaymentMethods)[keyof typeof PaymentMethods]['value'];
