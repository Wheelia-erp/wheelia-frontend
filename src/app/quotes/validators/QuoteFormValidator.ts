import { Validator } from 'fluentvalidation-ts';
import { QuoteEntity } from '../entity/quote.entity';

export class QuoteFormValidator extends Validator<QuoteEntity> {
  constructor() {
    super();
  }
}
