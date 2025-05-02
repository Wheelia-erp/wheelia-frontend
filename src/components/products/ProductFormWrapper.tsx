'use client';

import { ProductFormDto } from "@/app/products/dto/product-form.dto";
import { ProductEntity } from "@/app/products/entity/product.entity";
import { LifeCycleTypes, ProductKinds, ProrationPolicies } from "@/app/products/entity/product.enums";
import { fluentResolver } from "@/lib/fluent-resolver";
import ProductForm from "./ProductForm";
import { FormProvider, useForm } from "react-hook-form";
import { ProductFormValidator } from "./validators/ProductFormValidator";
import { FormPageTemplate } from "../form/FormPageTemplate";
import { FormCancelButton } from "../form/FormCancelButton";
import { FormButton } from "../form/FormButton";
import { ProductSummary } from "./ProductSummary";

interface ProductFormWrapperProps {
  title: string;
  defaultValues?: Partial<ProductFormDto>;
  isViewing?: boolean;
  isEditing?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: ProductEntity) => Promise<void>;
  onCancel?: () => void;
}

export function ProductFormWrapper({
  title,
  defaultValues,
  isViewing,
  isEditing,
  readOnly,
  loading,
  onSubmit,
  onCancel,
}: ProductFormWrapperProps) {

    const form = useForm<ProductEntity, ProductFormDto>({
        resolver: fluentResolver<ProductEntity>(new ProductFormValidator()),
        defaultValues: {
            kind: ProductKinds.SERVICE.value,
            lifeCycleType: LifeCycleTypes.RECURRING.value,
            proration: ProrationPolicies.PROPORTIONAL.value,
            unit: "Unidade",
            ...defaultValues,
        },
    });

    return (
      <FormProvider {...form}>
        <FormPageTemplate
          title={title}
          isViewing={isViewing}
          isEditing={isEditing}
          readOnly={readOnly}
          onSubmit={form.handleSubmit(onSubmit)}
          breadcrumbItems={[
            { label: "Produtos", href: "/products" },
            { label: title },
          ]}
          actions={
            <>
              <FormCancelButton type="button" onClick={onCancel}>
                {readOnly ? "Voltar" : "Cancelar"}
              </FormCancelButton>
              {!readOnly && (
                <FormButton type="submit" disabled={loading}>
                  {isEditing ? "Salvar Alterações" : "Cadastrar Produto"}
                </FormButton>
              )}
            </>
          }
        >
          {readOnly ? (
            <ProductSummary data={defaultValues as ProductEntity} />
          ) : (
            <ProductForm readOnly={readOnly} form={form} />
          )}
        </FormPageTemplate>
      </FormProvider>
    );
}