import { ProductEntity } from '@/app/products/entity/product.entity';
import { FormButton } from '@/components/form/FormButton';
import { FormFieldWrapper } from '@/components/form/FormFieldWrapper';
import { FormInput } from '@/components/form/FormInput';
import { FormCurrencyInput } from '@/components/form/FormInputCurrency';
import ProductLookup from '@/components/products/lookups/ProductLookup';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'; // Ensure this path is correct for your Dialog components
import { currencyFormat } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { QuoteItemEntity } from '../entity/quote.entity';

interface QuoteItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (item: QuoteItemEntity) => void;
  itemToEdit?: QuoteItemEntity | null;
}

const defaultQuoteItemState = (): QuoteItemEntity => ({
  id: undefined,
  productId: '',
  product: undefined,
  description: '',
  unitPrice: 0,
  quantity: 1,
  discount: 0,
  total: 0,
  // Ensure all required fields of QuoteItemEntity are initialized
} as unknown as QuoteItemEntity);

export default function QuoteItemModal({ isOpen, onClose, onSubmit, itemToEdit }: QuoteItemModalProps) {
  const [quoteItem, setQuoteItem] = useState<QuoteItemEntity>(defaultQuoteItemState());

  useEffect(() => {
    if (isOpen) { 
      if (itemToEdit) {
        setQuoteItem(itemToEdit);
      } else {
        setQuoteItem(defaultQuoteItemState());
      }
    }
  }, [itemToEdit, isOpen]);

  useEffect(() => {
    const calculatedTotal = ((quoteItem.unitPrice || 0) * (quoteItem.quantity || 0) - (quoteItem.discount || 0));
    setQuoteItem((prev) => ({ ...prev, total: calculatedTotal > 0 ? calculatedTotal : 0 }));
  }, [quoteItem.unitPrice, quoteItem.quantity, quoteItem.discount]);

  function handleSubmitItem() {
    if (!quoteItem.productId) {
      toast.error("Selecione um produto!");
      return;
    }
    if (quoteItem.quantity <= 0) {
      toast.error("A quantidade deve ser maior que zero.");
      return;
    }
    if (quoteItem.unitPrice < 0) {
      toast.error("O preço unitário não pode ser negativo.");
      return;
    }
    if ((quoteItem.discount || 0) < 0) {
      toast.error("O desconto não pode ser negativo.");
      return;
    }
    const totalBruto = (quoteItem.unitPrice || 0) * (quoteItem.quantity || 0);
    if ((quoteItem.discount || 0) > totalBruto) {
      toast.error("O desconto não pode ser maior que o total do item.");
      return;
    }

    onSubmit(quoteItem);
  }

  const handleProductSelect = (selectedProduct: ProductEntity | null) => {
    if (selectedProduct) {
      setQuoteItem((prev) => ({
        ...prev,
        productId: selectedProduct.id,
        product: selectedProduct,
        description: prev.description || selectedProduct.name, 
        unitPrice: selectedProduct.price || 0,
      }));
    } else {
      setQuoteItem((prev) => ({
        ...prev,
        productId: '',
        product: undefined as unknown as ProductEntity,        
        discount: 0,        
        unitPrice: 0,
      }));
    }
  };

  const handleValueChange = (field: keyof QuoteItemEntity, value: number) => {
    setQuoteItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(openState) => {
        if (!openState) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {itemToEdit?.id
              ? 'Editar Item do Orçamento'
              : 'Adicionar Item ao Orçamento'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormFieldWrapper label="Produto/Serviço" required={true}>
            <ProductLookup
              name="productId"
              placeholder="Selecionar Produto/Serviço..."
              initialValue={
                quoteItem.product
                  ? { id: quoteItem.productId, name: quoteItem.product.name }
                  : undefined
              }
              onSelect={handleProductSelect}
              disabled={!!itemToEdit?.id && !!quoteItem.productId}
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Descrição do Item" required={true}>
            <FormInput
              placeholder="Descrição detalhada do item"
              id="quoteItem.description"
              value={quoteItem.description}
              onChange={(e) =>
                setQuoteItem({ ...quoteItem, description: e.target.value })
              }
            />
          </FormFieldWrapper>

          <div className="grid grid-cols-3 gap-4">
            <FormFieldWrapper label="Quantidade" required={true}>
              <FormInput
                type="number"
                id="quantity"
                placeholder="Qtd"
                value={quoteItem.quantity}
                onChange={(e) =>
                  handleValueChange('quantity', Number(e.target.value) || 0)
                }
                min="1"
              />
            </FormFieldWrapper>

            <FormFieldWrapper label="Preço Unitário" required={true}>
              <FormCurrencyInput
                name="unitPrice"                
                value={quoteItem.unitPrice}
                onChange={(value: number) =>
                  handleValueChange('unitPrice', value)
                }
              />
            </FormFieldWrapper>

            <FormFieldWrapper label="Desconto">
              <FormCurrencyInput
                name="discount"
                value={quoteItem.discount}
                onChange={(value: number) =>
                  handleValueChange('discount', value)
                }
              />
            </FormFieldWrapper>
          </div>
          <p className="text-right font-semibold text-lg mt-2">
            Total do Item: {currencyFormat(quoteItem.total)}
          </p>
        </div>
        <DialogFooter>
          <FormButton type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </FormButton>
          <FormButton type="button" onClick={handleSubmitItem}>
            {itemToEdit?.id ? 'Salvar Alterações' : 'Adicionar Item'}
          </FormButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}