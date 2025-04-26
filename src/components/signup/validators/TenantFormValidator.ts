import { Validator } from 'fluentvalidation-ts';

export type TenantFormValues = {
  tenantName: string;
  documentNumber?: string;
  phoneNumber?: string;
};

export class TenantFormValidator extends Validator<TenantFormValues> {
  constructor() {
    super();

    this.ruleFor('tenantName')
        .notEmpty()
        .withMessage('Nome da empresa é obrigatório');

    this.ruleFor('documentNumber')
        .must(cnpj => {
            if (!cnpj) return true;
            const onlyDigits = cnpj.replace(/\D/g, '');
            return /^\d{14}$/.test(onlyDigits);
        })
        .withMessage('CNPJ inválido');

    this.ruleFor('phoneNumber')
        .must(phone => {
            if (!phone) return true;
            const digits = phone.replace(/\D/g, '');
            return digits.length === 10 || digits.length === 11;
        })
        .withMessage('Telefone inválido');
    }
}
