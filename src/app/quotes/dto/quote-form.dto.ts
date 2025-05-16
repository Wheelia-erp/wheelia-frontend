import { BaseFormDto } from '@/core/dto/base-form.dto';
import {
  BillingPeriod,
  BillingPeriods,
  LifeCycleType,
  LifeCycleTypes,
  PaymentForm,
  PaymentForms,
  PaymentMethod,
  PaymentMethods,
  QuoteStatus,
  QuoteStatuses,
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

  constructor(entity?: QuoteItemFormDto) {
    Object.assign(this, {
      id: entity?.id || undefined,
      quoteId: entity?.quoteId || undefined,
      productId: entity?.productId || '',
      description: entity?.description || '',
      unitPrice: entity?.unitPrice || 0,
      quantity: entity?.quantity || 0,
      discount: entity?.discount || 0,
      total: entity?.total || 0,
    });
  }
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
    Object.assign(this, {
      id: entity?.id || undefined,
      customerId: entity?.customerId || '',
      status: entity?.status || QuoteStatuses.DRAFT,
      lifeCycleType: entity?.lifeCycleType || LifeCycleTypes.ONE_TIME,
      billingPeriod: entity?.billingPeriod || BillingPeriods.MONTHLY,
      paymentForm: entity?.paymentForm || PaymentForms.UPFRONT,
      qtyInstallments: entity?.qtyInstallments || 1,
      paymentMethod: entity?.paymentMethod || PaymentMethods.CASH,
      total: entity?.items?.reduce((total, item) => total + item.total, 0) || 0,
      expirationDate: entity?.expirationDate,
      items: entity?.items?.map((item) => new QuoteItemFormDto(item)),
    });
  }
}
