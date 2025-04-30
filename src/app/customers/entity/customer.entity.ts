import { BaseEntity } from "@/core/entity/base.entity";

export class CustomerEntity extends BaseEntity {
  personType!: "PF" | "PJ";
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
};
  