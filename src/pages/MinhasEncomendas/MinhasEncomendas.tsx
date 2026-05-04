import { useMemo, useState } from 'react';
import { PackageSearch } from 'lucide-react';
import { OrderDetailCard } from '@/components/features/orders/OrderDetailCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrders } from '@/hooks/useOrders';
import { orderStatusLabel } from '@/lib/order-status';
import type { OrderStatus } from '@/types/order.types';

const STATUS_OPTIONS: Array<{ value: OrderStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Todos os status' },
  { value: 'em_transito', label: orderStatusLabel('em_transito') },
  { value: 'saiu_entrega', label: orderStatusLabel('saiu_entrega') },
  { value: 'entregue', label: orderStatusLabel('entregue') },
  { value: 'atrasado', label: orderStatusLabel('atrasado') },
];

function MinhasEncomendas() {
  const { data: orders, isLoading } = useOrders();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<OrderStatus | 'all'>('all');

  const filtered = useMemo(() => {
    if (!orders) return [];
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesQuery =
        q === '' ||
        o.title.toLowerCase().includes(q) ||
        o.code.toLowerCase().includes(q);
      const matchesStatus = status === 'all' || o.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, status]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Minhas Encomendas</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Filtre por status, busque pelo nome ou código e abra cada pedido para ver valor,
          transportadora e linha do tempo. A estrela manda o item direto para{' '}
          <span className="font-medium text-foreground">Favoritos</span>.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative min-w-[200px] flex-1">
          <PackageSearch className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-9 pl-9"
            placeholder="Buscar por nome ou código..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filtrar encomendas"
          />
        </div>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v as OrderStatus | 'all')}
        >
          <SelectTrigger className="w-full sm:w-[220px]" size="sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-border/80 bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
          Nenhuma encomenda encontrada com esses filtros.
        </p>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((order) => (
            <OrderDetailCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MinhasEncomendas;
