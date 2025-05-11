import React, { useState, useEffect } from 'react';
import { FormButton } from '@/components/form/FormButton';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { QuoteItemEntity } from '../entity/quote.entity';
import ProductLookup from '@/components/products/lookups/ProductLookup';
import { FormInput } from '@/components/form/FormInput';
import { currencyFormat } from '@/lib/utils';
import { FormFieldWrapper } from '@/components/form/FormFieldWrapper';

interface QuoteItemAddProps {
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onAdd: (quote: QuoteItemEntity) => void;
}

export default function QuoteItemAdd(props: QuoteItemAddProps) {
  const { className, onAdd } = props;
  const [open, setOpen] = useState(false);
  const [quoteItem, setQuoteItem] = useState<QuoteItemEntity>({
    unitPrice: 0,
    quantity: 1,
    discount: 0,
    total: 0,
  } as QuoteItemEntity);

  useEffect(() => {
    const calculatedTotal = (quoteItem.unitPrice * quoteItem.quantity) - quoteItem.discount;
    setQuoteItem((prev) => ({ ...prev, total: calculatedTotal }));
  }, [quoteItem.unitPrice, quoteItem.quantity, quoteItem.discount]);

  function handleAddQuoteItem() {
    if (!quoteItem.productId) {
      alert("Selecione um produto/serviço.");
      return;
    }
    alert("Estranho")
    onAdd(quoteItem);
    setOpen(false);
    setQuoteItem({
      unitPrice: 0,
      quantity: 1,
      discount: 0,
      total: 0,
    } as QuoteItemEntity);
  }

  return (
    <div className={className}>
      <FormButton type="button" onClick={() => setOpen(true)}>
        Adicionar Item
      </FormButton>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="p-4" side="right">
          <SheetHeader>
            <SheetTitle>Adicionar Produto/Serviço</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col grid gap-4 md:grid-cols-1">
            <FormFieldWrapper label="Produto/Serviço" required={true}>
              <ProductLookup
                name="productId"
                placeholder="Selecionar Produto/Serviço..."
                onSelect={(item) =>
                  setQuoteItem((prev) => ({
                    ...prev,
                    productId: item.id,
                    product: item,
                    description: item.name,
                  }))
                }
              />
            </FormFieldWrapper>

            <FormFieldWrapper label="Quantidade" required={true}>
              <FormInput
                type="number"
                placeholder="Quantidade"
                className="w-1/3"
                value={quoteItem.quantity}
                onChange={(e) =>
                  setQuoteItem({
                    ...quoteItem,
                    quantity: Number(e.target.value),
                  })
                }
              />
            </FormFieldWrapper>

            <FormFieldWrapper label="Preço Unitário" required={true}>
              <FormInput
                type="number"
                placeholder="Preço Unitário"
                className="w-1/3"
                value={quoteItem.unitPrice}
                onChange={(e) =>
                  setQuoteItem({
                    ...quoteItem,
                    unitPrice: Number(e.target.value),
                  })
                }
              />
            </FormFieldWrapper>

            <FormFieldWrapper label="Desconto">
              <FormInput
                type="number"
                placeholder="Desconto"
                className="w-1/3"
                value={quoteItem.discount}
                onChange={(e) =>
                  setQuoteItem({
                    ...quoteItem,
                    discount: Number(e.target.value),
                  })
                }
              />
            </FormFieldWrapper>
          </div>

          <p className="text-right font-semibold">
            Total: {currencyFormat(quoteItem.total)}
          </p>

          <SheetFooter>
            <SheetClose asChild>
              <FormButton onClick={handleAddQuoteItem}>Adicionar</FormButton>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
