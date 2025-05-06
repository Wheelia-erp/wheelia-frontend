'use client';

import { useForm } from "react-hook-form";
import { QuoteEntity } from "../entity/quote.entity";
import { FormSection } from "@/components/form/FormSection";
import { FormFieldWrapper } from "@/components/form/FormFieldWrapper";
import { FormInput } from "@/components/form/FormInput";

interface QuoteFormProps {
  readOnly?: boolean;
  form: ReturnType<typeof useForm<QuoteEntity>>;    
}

export default function QuoteForm({ readOnly, form }: QuoteFormProps) {
  return (
    <>
      <FormSection title="Dados Gerais">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormFieldWrapper label="Identificador" required={!readOnly}>
            <FormInput {...form.register('id', { required: true })} />
          </FormFieldWrapper>
        </div>
      </FormSection>
    </>
  );
}