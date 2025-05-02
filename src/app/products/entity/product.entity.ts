import { BaseEntity } from "@/core/entity/base.entity";
import { LifeCycleType, ProductKind, ProrationPolicy } from "./product.enums";

export class ProductEntity extends BaseEntity {
    
    id!: string;  
    code!: string;  
    name!: string;  
    description?: string;  
    price?: number;  
    
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