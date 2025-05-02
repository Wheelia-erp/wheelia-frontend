'use client';

import { ProductEntity } from "@/app/products/entity/product.entity";
import { FormFieldWrapper } from "../form/FormFieldWrapper";
import { FormSection } from "../form/FormSection";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/FormInput";
import { FormTextarea } from "../form/FormTextarea";
import { FormSelect } from "../form/FormSelect";
import { LifeCycleTypes, ProrationPolicies } from "@/app/products/entity/product.enums";

interface ProductFormProps {    
    readOnly?: boolean;
    form: ReturnType<typeof useForm<ProductEntity>>;    
}

export default function ProductForm({ readOnly, form }: ProductFormProps) {

    return (
      <>
        {/** Dados Gerais */}
        <FormSection title="Dados Gerais">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormFieldWrapper
              label="Identificador"
              required={!readOnly}
              error={form.formState.errors.code?.message}
            >
              <FormInput {...form.register("code")} disabled={readOnly} />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Nome"
              required={!readOnly}
              error={form.formState.errors.name?.message}
            >
              <FormInput {...form.register("name")} disabled={readOnly} />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Preço"
              required={!readOnly}
              error={form.formState.errors.price?.message}
            >
              <FormInput {...form.register("price")} disabled={readOnly} />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Unidade de medida"
              required={!readOnly}
              error={form.formState.errors.unit?.message}
            >
              <FormInput {...form.register("unit")} disabled={readOnly} />
            </FormFieldWrapper>
          </div>
          <FormFieldWrapper
            label="Descrição"
            error={form.formState.errors.description?.message}
          >
            <FormTextarea
              {...form.register("description")}
              disabled={readOnly}
              rows={5}
            />
          </FormFieldWrapper>
        </FormSection>
        <FormSection title="Informações Adicionais">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormFieldWrapper
              label="Ciclo de vida"
              required={!readOnly}
              error={form.formState.errors.lifeCycleType?.message}
            >
              <FormSelect
                {...form.register("lifeCycleType")}
                disabled={readOnly}
              >
                {Object.values(LifeCycleTypes).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Cobrança fracionada"
              required={!readOnly}
              error={form.formState.errors.proration?.message}
            >
              <FormSelect {...form.register("proration")} disabled={readOnly}>
                {Object.values(ProrationPolicies).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
            </FormFieldWrapper>
          </div>
        </FormSection>
        <FormSection title="Dados fiscais">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormFieldWrapper
              label="Código NBS"
              error={form.formState.errors.nbsCode?.message}
            >
              <FormInput {...form.register("nbsCode")} disabled={readOnly} />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Código CNAE"
              error={form.formState.errors.cnaeCode?.message}
            >
              <FormInput {...form.register("cnaeCode")} disabled={readOnly} />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Alíquota ISS"
              error={form.formState.errors.issRate?.message}
            >
              <FormInput {...form.register("issRate")} disabled={readOnly} />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Código de Serviço (Municipal)"
              error={form.formState.errors.municipalServiceCode?.message}
            >
              <FormInput
                {...form.register("municipalServiceCode")}
                disabled={readOnly}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Descrição para Nota Fiscal"
              error={form.formState.errors.nfseDescription?.message}
            >
              <FormInput
                {...form.register("nfseDescription")}
                disabled={readOnly}
              />
            </FormFieldWrapper>           
          </div>
        </FormSection>
      </>
    );
}