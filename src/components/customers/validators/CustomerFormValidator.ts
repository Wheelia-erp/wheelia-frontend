import { Validator } from 'fluentvalidation-ts';
import { CustomerFormValues } from '@/components/customers/CustomerForm';

export class CustomerFormValidator extends Validator<CustomerFormValues> {
  constructor() {
    super();

    this.ruleFor("personType")
      .notEmpty()
      .withMessage("Tipo de pessoa é obrigatório.");

    this.ruleFor('document')
      .notEmpty()
      .withMessage('Documento é obrigatório.');

    this.ruleFor('name')
      .notEmpty()
      .withMessage('Nome é obrigatório.');

    this.ruleFor('email')
      .must(email => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      .withMessage('E-mail inválido.');

    this.ruleFor('birthOrOpeningDate')
      .must(date => !date || /^\d{4}-\d{2}-\d{2}$/.test(date))
      .withMessage('Data inválida.');

    this.ruleFor('zipCode')
      .must(zip => !zip || /^\d{5}-?\d{3}$/.test(zip))
      .withMessage('CEP inválido.');
  }
}
