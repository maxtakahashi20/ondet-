import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderItem } from '@/components/features/dashboard/OrderItem/OrderItem';
import { Skeleton } from '@/components/ui/skeleton';
import { useFavoritesStore } from '@/stores/favoritesStore';
import type { Order } from '@/types/order.types';

interface FavoritesListProps {
  orders: Order[] | undefined;
  isLoading: boolean;
}

export function FavoritesList({ orders, isLoading }: FavoritesListProps) {
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  const favorites =
    orders?.filter((o) => isFavorite(o.id)).slice(0, 4) ?? [];

  return (
    <Card className="border-border/60 bg-card/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Encomendas Favoritas</CardTitle>
        <Link
          to="/favoritos"
          className="text-sm font-medium text-primary hover:underline"
        >
          Ver todas
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-4 py-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && favorites.length === 0 && (
          <p className="py-6 text-sm text-muted-foreground">
            Nenhuma encomenda favoritada ainda.
          </p>
        )}

        {!isLoading && favorites.length > 0 && (
          <div>
            {favorites.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                variant="favorite"
                favorite
                onToggleFavorite={() => toggle(order.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
