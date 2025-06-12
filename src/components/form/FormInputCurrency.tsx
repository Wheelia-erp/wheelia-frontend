import React, { useEffect, useState } from "react";

interface FormCurrencyInputProps {
  name: string;
  value?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function FormCurrencyInput({
  name,
  value = 0,
  onChange,
  className = "",
  disabled = false,
  placeholder = "0,00",
}: FormCurrencyInputProps) {
  const [rawDigits, setRawDigits] = useState("0");

  // Ao receber novo value externo, converte para string de dígitos (ex: 1234.56 → "123456")
  useEffect(() => {
    const numeric = Math.round((value || 0) * 100).toString();
    setRawDigits(numeric);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // só números
    const sanitized = input.replace(/^0+(?=\d)/, ""); // remove zeros à esquerda

    const digits = sanitized.length > 0 ? sanitized : "0";
    setRawDigits(digits);

    const parsedValue = parseInt(digits, 10) / 100;
    onChange?.(parsedValue);
  };

  const displayValue = formatCurrency(parseInt(rawDigits, 10) / 100);

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value} />
      <input
        type="text"
        inputMode="numeric"
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${className}`}
        value={displayValue}
        onChange={handleInputChange}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}

const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
