import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderItem } from '@/components/features/dashboard/OrderItem/OrderItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import type { Order } from '@/types/order.types';

interface OrderListProps {
  orders: Order[] | undefined;
  isLoading: boolean;
}

export function OrderList({ orders, isLoading }: OrderListProps) {
  return (
    <Card className="border-border/60 bg-card/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Minhas Encomendas</CardTitle>
        <Link
          to="/minhas-encomendas"
          className="text-sm font-medium text-primary hover:underline"
        >
          Ver todas
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-4 py-2">
            {Array.from({ length: 4 }).map((_, i) => (
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

        {!isLoading && orders && (
          <ScrollArea className="h-[min(420px,55vh)] pr-3">
            <div>
              {orders.map((order) => (
                <OrderItem key={order.id} order={order} variant="row" />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
