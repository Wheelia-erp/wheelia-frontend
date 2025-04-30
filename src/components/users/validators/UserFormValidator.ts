import { Validator } from 'fluentvalidation-ts';
import { UserEntity } from '../../../app/settings/users/entity/user.entity';

export class UserFormValidator extends Validator<UserEntity> {
  constructor() {
    super();
/*
    this.ruleFor("name")
      .notEmpty()
      .withMessage("Nome é obrigatório")
      .minLength(2)
      .withMessage("Nome muito curto");

    this.ruleFor("email")
      .notEmpty()
      .withMessage("E-mail é obrigatório")
      .emailAddress()
      .withMessage("E-mail inválido");

    this.ruleFor("phone")
      .maxLength(20)
      .withMessage("Telefone inválido")
      .when((model) => !!model.phone);*/
  }
}
