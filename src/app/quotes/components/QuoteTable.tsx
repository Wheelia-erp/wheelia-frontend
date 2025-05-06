'use client';

import Table from "@/components/shared/table/Table";
import { QuoteEntity } from "../entity/quote.entity";
import TableHead from "@/components/shared/table/TableHead";
import TableHeader from "@/components/shared/table/TableHeader";
import TableHeaderRow from "@/components/shared/table/TableHarderRow";
import TableBody from "@/components/shared/table/TableBody";
import QuoteTableEmpty from "./QuoteTableEmpty";
import { QuoteTableRow } from "./QuoteTableRow";


interface QuoteTableProps {
  quotes: QuoteEntity[];
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
  onEdit: (quote: QuoteEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onView: (quote: QuoteEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (quote: QuoteEntity) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (quote: QuoteEntity) => void; 
}

export default function QuoteTable(props: QuoteTableProps) {
  const { quotes, loading, page, pageSize, totalItems, hasNextPage, hasPreviousPage, onNextPage, onPreviousPage, onPageSizeChange, onEdit, onView, onDelete, onChangeStatus } = props;  
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
          <TableHeader>#ID</TableHeader>
          <TableHeader>Cliente</TableHeader>
          <TableHeader>Total</TableHeader>
          <TableHeader>Expira em</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Ações</TableHeader>
        </TableHeaderRow>
      </TableHead>
      <TableBody
        loading={loading}
        skeletonColumns={5}
        skeletonRows={5}>
          {!loading && (
            <>
              {quotes.length === 0 ? (
                <QuoteTableEmpty />
              ) : (
                quotes.map((quote, index) => (
                  <QuoteTableRow
                    key={index}
                    quote={quote}
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