'use client';

import { ProductEntity } from "@/app/products/entity/product.entity";
import Table from "../shared/table/Table";
import TableHead from "../shared/table/TableHead";
import TableHeaderRow from "../shared/table/TableHarderRow";
import TableHeader from "../shared/table/TableHeader";
import TableBody from "../shared/table/TableBody";
import { ProductRow } from "./ProductRow";
import ProductTableEmpty from "./ProductsTableEmpty";

interface ProductTableProps {
    products: ProductEntity[];
    loading?: boolean;
    page: number;
    pageSize: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onNextPage: () => void;
    onPreviousPage: () => void;
    // eslint-disable-next-line no-unused-vars
    onPageSizeChange: (size: number) => void;
    // eslint-disable-next-line no-unused-vars
    onEdit: (product: ProductEntity) => void;
    // eslint-disable-next-line no-unused-vars
    onView: (product: ProductEntity) => void;
    // eslint-disable-next-line no-unused-vars
    onDelete: (product: ProductEntity) => void;
    // eslint-disable-next-line no-unused-vars
    onChangeStatus: (product: ProductEntity) => void; 
}

export default function ProductTable({ products, loading, page, pageSize, totalItems, hasNextPage, hasPreviousPage, onNextPage, onPreviousPage, onPageSizeChange, onEdit, onView, onDelete, onChangeStatus }: ProductTableProps) {
     return (
        <Table
            loading={loading}
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            onPageSizeChange={onPageSizeChange}  
            >
            <TableHead>
                <TableHeaderRow>
                    <TableHeader>Código</TableHeader>
                    <TableHeader>Nome</TableHeader>
                    <TableHeader>Preço</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Ações</TableHeader>
                </TableHeaderRow>
            </TableHead>
            <TableBody
                loading={loading}
                skeletonRows={5}
                skeletonColumns={5}>
                {!loading && (
                <>
                    {products.length === 0 ? (
                        <ProductTableEmpty />
                    ) : (
                        products.map((product) => (
                        <ProductRow
                            key={product.id}
                            product={product}
                            onEdit={onEdit}
                            onView={onView}
                            onDelete={onDelete}
                            onChangeStatus={onChangeStatus}
                        />
                        ))
                    )}
                </>
                )}
            </TableBody>
        </Table>
     );
}