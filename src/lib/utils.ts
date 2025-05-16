import { BaseFormDto } from '@/core/dto/base-form.dto';
import { EnumOption } from '@/core/enum/base.enum';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | undefined | null) {
  if (!date) return '';

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
}

export function undefinedWhenEmpty(value: string | undefined) {
  if (value === undefined || value === '') {
    return undefined;
  }
  return value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sanitizeForm(data: BaseFormDto): any {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (value === '') {
        return [key, undefined];
      }
      if (Array.isArray(value)) {
        return [
          key,
          value.map((item) =>
            typeof item === 'object' && item !== null
              ? sanitizeForm(item)
              : item
          ),
        ];
      }
      if (typeof value === 'object' && value !== null) {
        return [key, sanitizeForm(value)];
      }
      return [key, value];
    })
  );
}

export function getLabelByValue<T extends Record<string, EnumOption>>(
  map: T,
  value: string
): string | undefined {
  if (value === undefined) return value;
  const match = Object.values(map).find((option) => option.value === value);
  return match?.label ?? value;
}

export function currencyFormat(value: number | string) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(typeof value === 'string' ? parseFloat(value) : value);
}
