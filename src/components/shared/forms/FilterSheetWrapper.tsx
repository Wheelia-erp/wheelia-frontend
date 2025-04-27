'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { FormInput } from '@/components/form/FormInput';
import { FormButton } from '@/components/form/FormButton';
import { Funnel } from 'lucide-react';

export interface FilterField {
  name: string;
  label: string;
  type: 'text' | 'boolean';
}

interface FilterSheetWrapperProps {
  fields: FilterField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onChange: (values: Record<string, any>) => void;
  className?: string;
}

export function FilterSheetWrapper({ fields, filters, onChange, className }: FilterSheetWrapperProps) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [draftFilters, setDraftFilters] = useState<Record<string, any>>(filters);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFieldChange(field: string, value: any) {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
  }

  function handleApplyFilters() {
    onChange(draftFilters);
    setOpen(false);
  }

  function handleClearFilters() {
    const cleared = fields.reduce((acc, field) => ({ ...acc, [field.name]: undefined }), {});
    onChange(cleared);
    setDraftFilters(cleared);
    setOpen(false);
  }

  return (
    <div className={cn("flex items-center", className)}>
      <FormButton
        variant="secondary"
        size="icon"
        onClick={() => {
          setDraftFilters(filters);
          setOpen(true);
        }}
      >
        <Funnel className="h-5 w-5" />
      </FormButton>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader className='bg-gray-200 px-4 py-3 border-b border-gray-300'>
            
            <SheetTitle>
              Filtrar Resultados
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 mt-6 pl-4 pr-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <Label className="mb-1">{field.label}</Label>

                {field.type === "text" && (
                  <FormInput
                    placeholder={`Digite ${field.label.toLowerCase()}`}
                    value={draftFilters[field.name] ?? ""}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                  />
                )}

                {field.type === "boolean" && (
                  <Select
                    value={
                      draftFilters[field.name] === undefined
                        ? ""
                        : draftFilters[field.name]
                        ? "true"
                        : "false"
                    }
                    onValueChange={(value) =>
                      handleFieldChange(field.name, value === "true")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sim</SelectItem>
                      <SelectItem value="false">Não</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}            
          </div>
          <div className="fixed bottom-0 right-0 w-[384px] bg-gray-50 px-4 py-3 border-t border-gray-300 flex justify-between">
            <FormButton variant="secondary" onClick={handleClearFilters}>
              Limpar
            </FormButton>
            <FormButton variant="default" onClick={handleApplyFilters}>
              Aplicar
            </FormButton>
          </div>          
        </SheetContent>
      </Sheet>
    </div>
  );
}
