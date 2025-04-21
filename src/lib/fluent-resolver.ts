import { Resolver } from 'react-hook-form';
import { Validator } from 'fluentvalidation-ts';

export function fluentResolver<T extends object>(validator: Validator<T>): Resolver<T> {
  return async (values) => {
    const result = validator.validate(values);

    const errors = Object.entries(result).reduce((acc, [key, message]) => {
      if (message !== null) {
        acc[key] = {
          type: 'validation',
          message,
        };
      }
      return acc;
    }, {} as any);

    return {
      values: Object.keys(errors).length === 0 ? values : {},
      errors,
    };
  };
}
