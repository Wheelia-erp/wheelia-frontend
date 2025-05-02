'use client';

import { FilterValue, useCrud } from "@/hooks/crud/useCrud";
import { useState } from "react";
import { ProductEntity } from "./entity/product.entity";
import { ProductFormDto } from "./dto/product-form.dto";
import { useApiErrorToast } from "@/hooks/crud/useApiErrorToast";
import { sanitizeForm } from "@/lib/utils";
import { toast } from "sonner";
import { FilterField, FilterSheetWrapper } from "@/components/shared/forms/FilterSheetWrapper";
import AppShell from "@/components/layout/AppShell";
import { FormButton } from "@/components/form/FormButton";
import ProductTable from "@/components/products/ProductTable";
import { ProductFormWrapper } from "@/components/products/ProductFormWrapper";

export default function ProductsPage() {
    const [filters, setFilters] = useState<Record<string, FilterValue>>({});

    const {
      items: products,
      itemBeingEdited,
      isViewing,
      isEditing,
      isFormOpen,
      loading,
      page,
      pageSize,
      totalItems,
      hasNextPage,
      hasPreviousPage,
      setPage,
      setPageSize,
      onNextPage,
      onPreviousPage,
      openForm,
      cancelForm,
      onView,
      onEdit,      
      remove,
      update,
      create,
      changeStatus,
    } = useCrud<ProductEntity, ProductFormDto>({
        endpoint: "/products",
        filters
    });

    const { show: showError } = useApiErrorToast();

    const handleSubmit = async (data: ProductEntity) => {        
        try {
            const dataToSave = sanitizeForm(new ProductFormDto(data));       
            if (itemBeingEdited) {        
                await update(itemBeingEdited.id, dataToSave);
                toast.success('Produto atualizado com sucesso!');
            } else {
                await create(dataToSave);
                toast.success('Produto criado com sucesso!');
            }
            cancelForm();
        } catch (err) {
            showError(err);
        }
    };

    const handleDelete = async (product: ProductEntity) => {
        try {      
            await remove(product.id);
            toast.success('Produto excluído com sucesso!');
        } catch (err) {
            showError(err);
        }
    };

    const handleStatusChange = async (product: ProductEntity) => {
        try {         
            await changeStatus(product.id);
            toast.success('Status do produto alterado com sucesso!');
        } catch (err) {
            showError(err);
        }
    };
    const filterFields: FilterField[] = [
        { name: 'name', label: 'Nome', type: 'text' },
        { name: 'code', label: 'Codigo', type: 'text' },
        { name: 'isActive', label: 'Ativo', type: 'boolean' },      
    ];

    return (
        <AppShell>
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Produtos</h1>
            <div className="flex gap-2">
                {!isFormOpen && (
                    <FilterSheetWrapper
                        fields={filterFields}
                        filters={filters}
                        onChange={(newFilters) => {
                        setFilters(newFilters);
                        setPage(1); 
                        }}
                    />
                )}
                {!isFormOpen && (
                    <FormButton onClick={() => openForm()}>
                        Novo Produto
                    </FormButton>
                )}
            </div>          
            </div>

            {isFormOpen ? (
                <ProductFormWrapper
                    title='Produto'
                    defaultValues={itemBeingEdited ?? undefined}
                    isEditing={isEditing}
                    readOnly={isViewing}
                    onSubmit={handleSubmit}
                    onCancel={cancelForm}
                    loading={loading}
                />
            ) : (
                <ProductTable
                    products={products ?? []}
                    loading={loading}
                    page={page}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                    onNextPage={onNextPage}
                    onPreviousPage={onPreviousPage}
                    onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                    }}
                    onEdit={onEdit}
                    onView={onView}
                    onDelete={handleDelete}
                    onChangeStatus={handleStatusChange}
                />
            )}
        </div>
        </AppShell>
    );

}