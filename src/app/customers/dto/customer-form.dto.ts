import { BaseFormDto } from '@/core/dto/base-form.dto';
import { CustomerEntity } from '../entity/customer.entity';
import { undefinedWhenEmpty } from '@/lib/utils';

export class CustomerFormDto extends BaseFormDto {    
    personType!: 'PF' | 'PJ';
    document!: string;
    name!: string;
    reference?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    birthDate?: string;
    openingDate?: string;
    country?: string;
    zipCode?: string;
    address?: string;
    number?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    complement?: string;
    notes?: string;

    constructor(data: CustomerEntity) {
        super();
        Object.assign(this, {
          isActive: data.isActive,
          personType: data.personType,
          document: data.document,
          name: data.name,
          reference: data.reference,
          email: undefinedWhenEmpty(data.email),
          phone: data.phone,
          mobile: data.mobile,
          birthDate: undefinedWhenEmpty(data.birthDate),
          openingDate: undefinedWhenEmpty(data.openingDate),
          country: data.country,
          zipCode: data.zipCode,
          address: data.address,
          number: data.number,
          state: data.state,
          city: data.city,
          neighborhood: data.neighborhood,
          complement: data.complement,
          notes: data.notes,
        });        
    }
}
