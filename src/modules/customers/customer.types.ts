export interface Customer {
    isActive: boolean | undefined;
    mobile: string;
    document: string;
    phone: string;
    id: string;
    name: string;
    email: string;
    status: 'Ativo' | 'Inativo';
  }