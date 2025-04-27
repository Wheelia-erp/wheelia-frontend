export interface Customer {
    isActive: boolean | undefined;
    mobile: any;
    document: ReactNode;
    phone: any;
    id: string;
    name: string;
    email: string;
    status: 'Ativo' | 'Inativo';
  }