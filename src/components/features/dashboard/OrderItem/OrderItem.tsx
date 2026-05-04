import { ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { carrierInitial, carrierRingClass } from '@/lib/carrier';
import { orderStatusBadgeClass, orderStatusLabel } from '@/lib/order-status';
import { cn } from '@/lib/utils';
import type { Order } from '@/types/order.types';

interface OrderItemProps {
  order: Order;
  variant: 'row' | 'favorite';
  favorite?: boolean;
  onToggleFavorite?: () => void;
}

export function OrderItem({
  order,
  variant,
  favorite,
  onToggleFavorite,
}: OrderItemProps) {
  return (
    <div className="flex items-center gap-3 border-b border-border/50 py-4 last:border-0 last:pb-0 first:pt-0">
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-1',
          carrierRingClass(order.carrier),
        )}
        aria-hidden
      >
        {carrierInitial(order.carrier)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-medium text-foreground">{order.title}</p>
          <Badge
            variant="outline"
            className={cn('border', orderStatusBadgeClass(order.status))}
          >
            {orderStatusLabel(order.status)}
          </Badge>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{order.code}</p>
        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground/90">
          {order.location}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{order.updatedLabel}</p>
      </div>

      {variant === 'row' && (
        <Link
          to="/minhas-encomendas"
          className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
          aria-label="Ver detalhes"
        >
          <ChevronRight className="size-5" />
        </Link>
      )}

      {variant === 'favorite' && onToggleFavorite && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="shrink-0 text-amber-400 hover:text-amber-300"
          onClick={onToggleFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Star
            className={cn('size-5', favorite && 'fill-amber-400 text-amber-400')}
          />
        </Button>
      )}
    </div>
  );
}
