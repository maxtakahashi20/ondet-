import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { CATALOG_PRODUCTS } from '@/data/catalogProducts';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAddOrders } from '@/hooks/useAddOrders';
import { carrierLabel } from '@/lib/carrier';
import { createOrdersFromCatalog } from '@/lib/new-order-factory';
import { formatBrl } from '@/lib/money';
import { cn } from '@/lib/utils';

interface NewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewOrderDialog({ open, onOpenChange }: NewOrderDialogProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const addOrders = useAddOrders();

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleConfirm = async () => {
    const items = CATALOG_PRODUCTS.filter((p) => selected.has(p.id));
    if (items.length === 0) return;
    const orders = createOrdersFromCatalog(items);
    await addOrders.mutateAsync(orders);
    setSelected(new Set());
    onOpenChange(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) setSelected(new Set());
    onOpenChange(next);
  };

  const selection = CATALOG_PRODUCTS.filter((p) => selected.has(p.id));
  const total = selection.reduce((s, p) => s + p.valueBrl, 0);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className="max-h-[min(90vh,640px)] gap-0 overflow-hidden p-0 sm:max-w-lg"
      >
        <DialogHeader className="border-b border-border/60 px-4 pb-3 pt-4 sm:px-6">
          <DialogTitle>Nova encomenda</DialogTitle>
          <DialogDescription>
            Escolha um ou mais itens do catálogo — cada um entra como um rastreamento à
            parte.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[min(52vh,420px)] px-4 sm:px-6">
          <div className="space-y-2 py-4 pr-3">
            {CATALOG_PRODUCTS.map((product) => {
              const checked = selected.has(product.id);
              return (
                <label
                  key={product.id}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors',
                    checked
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-border/60 bg-card/40 hover:bg-muted/30',
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggle(product.id)}
                    aria-labelledby={`prod-${product.id}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      id={`prod-${product.id}`}
                      className="text-sm font-medium leading-tight text-foreground"
                    >
                      {product.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {product.description} · {carrierLabel(product.carrier)}
                    </p>
                    <p className="mt-1 text-sm font-semibold tabular-nums text-primary">
                      {formatBrl(product.valueBrl)}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </ScrollArea>

        <div className="border-t border-border/60 bg-muted/20 px-4 py-3 sm:px-6">
          <p className="text-xs text-muted-foreground">
            {selection.length === 0 ? (
              'Nenhum item selecionado.'
            ) : (
              <>
                <span className="font-medium text-foreground">{selection.length}</span>{' '}
                item(ns) · Total estimado{' '}
                <span className="font-semibold tabular-nums text-foreground">
                  {formatBrl(total)}
                </span>
              </>
            )}
          </p>
        </div>

        <DialogFooter className="gap-2 border-t border-border/60 px-4 py-3 sm:px-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={addOrders.isPending}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={selection.length === 0 || addOrders.isPending}
          >
            {addOrders.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Registrando…
              </>
            ) : (
              'Confirmar encomenda'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
