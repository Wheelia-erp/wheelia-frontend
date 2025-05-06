import { BaseFormDto } from '@/core/dto/base-form.dto';
import {
  BillingPeriod,
  LifeCycleType,
  PaymentForm,
  PaymentMethod,
  QuoteStatus,
} from '../entity/quote.enum';
import { QuoteEntity } from '../entity/quote.entity';
import { CustomerFormDto } from '@/app/customers/dto/customer-form.dto';
import { ProductFormDto } from '@/app/products/dto/product-form.dto';

export class QuoteItemFormDto {
  id!: string;
  quoteId!: string;
  productId!: string;
  product!: ProductFormDto;
  description!: string;
  unitPrice!: number;
  quantity!: number;
  discount!: number;
  total!: number;
}

export class QuoteFormDto extends BaseFormDto {
  code!: string;
  customerId!: string;
  customer!: CustomerFormDto;
  status!: QuoteStatus;
  lifeCycleType!: LifeCycleType;
  billingPeriod?: BillingPeriod;
  paymentForm?: PaymentForm;
  qtyInstallments!: number;
  paymentMethod!: PaymentMethod;
  total!: number;
  expirationDate?: Date;
  items?: QuoteItemFormDto[];

  constructor(entity?: QuoteEntity) {
    super();
    Object.assign(this, entity);
  }
}
