export const ProductKinds = {
  SERVICE: { value: "service", label: "Serviço" },
  PRODUCT: { value: "product", label: "Produto" },
}
export type ProductKind = (typeof ProductKinds)[keyof typeof ProductKinds]["value"];

export const LifeCycleTypes = {
  RECURRING: { value: "recurring", label: "Recorrente" },
  ONE_TIME: { value: "one-time", label: "Uma vez" },
};
export type LifeCycleType = (typeof LifeCycleTypes)[keyof typeof LifeCycleTypes]["value"];

export const ProrationPolicies = {
  FULL: { value: "full", label: "Valor Integral" },
  PROPORTIONAL: { value: "proportional", label: "Proporcional ao período" },
}
export type ProrationPolicy = typeof ProrationPolicies[keyof typeof ProrationPolicies]['value'];