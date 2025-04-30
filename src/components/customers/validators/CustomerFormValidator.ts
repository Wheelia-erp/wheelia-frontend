import { CustomerEntity } from '@/app/customers/entity/customer.entity';
import { Validator } from 'fluentvalidation-ts';

export class CustomerFormValidator extends Validator<CustomerEntity> {
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
/*
    this.ruleFor('birthDate')
      .must(value => !!value && value !== '')
      //.must(date => !date || /^\d{4}-\d{2}-\d{2}$/.test(date))
      .withMessage('Data inválida.');

    this.ruleFor('openingDate')
      .must(value => !!value && value !== '')
      //.must(date => !date || /^\d{4}-\d{2}-\d{2}$/.test(date))
      .withMessage('Data inválida.');
      
    this.ruleFor('zipCode')
      .must(zip => !zip || /^\d{5}-?\d{3}$/.test(zip))
      .withMessage('CEP inválido.');*/
  }
}
