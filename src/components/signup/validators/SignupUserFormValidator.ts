import { Validator } from 'fluentvalidation-ts';

export type SignupUserFormValues = {
    name: string;
    email: string;    
    password: string;
    confirmPassword: string
};

  export class SignupUserFormValidator extends Validator<SignupUserFormValues> {
    constructor() {
        super();
  
        this.ruleFor('name')
            .notEmpty()
            .withMessage('Nome é obrigatório');

        this.ruleFor('email')
            .notEmpty()
            .withMessage('E-mail é obrigatório')
            .emailAddress()
            .withMessage('E-mail inválido');
        
        this.ruleFor('password')
            .notEmpty()
            .withMessage('Senha é obrigatória')
            .minLength(6)
            .withMessage('Senha muito curta');
      
        this.ruleFor('confirmPassword')
            .notEmpty()
            .withMessage('Confirmação de senha é obrigatória');
      
          
        this.ruleFor('confirmPassword')
            .must((confirm, obj) => confirm === obj.password)
            .withMessage('As senhas não coincidem');
    }
}