import { BaseEntity } from '@/core/entity/base.entity';
import {
  BillingPeriod,
  LifeCycleType,
  PaymentForm,
  PaymentMethod,
  QuoteStatus,
} from '../entity/quote.enum';
import { CustomerEntity } from '@/app/customers/entity/customer.entity';
import { ProductEntity } from '@/app/products/entity/product.entity';

export class QuoteItemEntity {
  id!: string;
  quoteId!: string;
  productId!: string;
  product!: ProductEntity;
  description!: string;
  unitPrice!: number;
  quantity!: number;
  discount!: number;
  total!: number;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export class QuoteEntity implements BaseEntity {
  id!: string;
  code!: string;
  customerId!: string;
  customer!: CustomerEntity;
  status!: QuoteStatus;
  lifeCycleType!: LifeCycleType;
  billingPeriod?: BillingPeriod;
  paymentForm?: PaymentForm;
  qtyInstallments!: number;
  paymentMethod!: PaymentMethod;
  total!: number;
  expirationDate?: Date;
  items?: QuoteItemEntity[];
  isActive!: boolean;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
