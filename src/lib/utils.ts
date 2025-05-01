import { BaseFormDto } from "@/core/dto/base-form.dto";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export function sanitizeForm(data: BaseFormDto) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === '' ? undefined : value,
    ])
  );
}

