import { Star } from 'lucide-react';
import { OrderDetailCard } from '@/components/features/orders/OrderDetailCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrders } from '@/hooks/useOrders';
import { useFavoritesStore } from '@/stores/favoritesStore';

function Favoritos() {
  const { data: orders, isLoading } = useOrders();
  const ids = useFavoritesStore((s) => s.ids);

  const favorites =
    orders?.filter((o) => ids[o.id]) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Favoritos</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Todos os produtos em que você marcou a estrela — os mesmos dados completos de{' '}
          <span className="font-medium text-foreground">Minhas Encomendas</span>, filtrados
          só pelos favoritos.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/15 px-6 py-16 text-center">
          <div className="mb-3 rounded-full bg-muted p-4">
            <Star className="size-8 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">Nenhum favorito ainda</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Abra <strong>Minhas Encomendas</strong> ou o painel e clique na estrela ao lado do
            pedido para salvar aqui.
          </p>
        </div>
      )}

      {!isLoading && favorites.length > 0 && (
        <div className="space-y-4">
          {favorites.map((order) => (
            <OrderDetailCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;
