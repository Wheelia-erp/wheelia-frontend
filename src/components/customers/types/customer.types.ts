export type Customer = {
    id: string;
    personType: 'PF' | 'PJ';
    document: string;
    name: string;
    reference?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    birthOrOpeningDate?: string;
    country?: string;
    zipCode?: string;
    address?: string;
    number?: string;
    state?: string;
    city?: string;
    district?: string;
    complement?: string;
    notes?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  