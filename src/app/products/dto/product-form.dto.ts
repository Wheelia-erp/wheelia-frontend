import { ProductEntity } from "../entity/product.entity";
import { BaseFormDto } from "@/core/dto/base-form.dto";
import { LifeCycleType, ProductKind, ProrationPolicy } from "../entity/product.enums";

export class ProductFormDto extends BaseFormDto {
    constructor(entity: ProductEntity){
        super();
        this.code = entity.code;
        this.name = entity.name;
        this.description = entity.description;
        this.price = entity.price;
        this.isActive = entity.isActive;
        this.kind = entity.kind;
        this.lifeCycleType = entity.lifeCycleType;
        this.proration = entity.proration;
        this.unit = entity.unit;
        this.nbsCode = entity.nbsCode;
        this.cnaeCode = entity.cnaeCode;
        this.issRate = entity.issRate;
        this.municipalServiceCode = entity.municipalServiceCode;
        this.nfseDescription = entity.nfseDescription;        
    }

    code!: string;  
    name!: string;  
    description?: string;  
    price?: number;  
    isActive?: boolean | undefined;
    kind!: ProductKind;  
    lifeCycleType!: LifeCycleType;  
    proration!: ProrationPolicy;  
    unit!: string;  
    nbsCode?: string;  
    cnaeCode?: string;  
    issRate?: number;      
    municipalServiceCode?: string;    
    nfseDescription?: string;
}   