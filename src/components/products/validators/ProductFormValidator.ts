import { ProductEntity } from "@/app/products/entity/product.entity";
import { Validator } from "fluentvalidation-ts";

export class ProductFormValidator extends Validator<ProductEntity> {
    constructor(){
        super();
        
        this.ruleFor('name')
            .minLength(3)
            .withMessage('O nome do produto deve ter pelo menos 3 caracteres');
     
    }    
}