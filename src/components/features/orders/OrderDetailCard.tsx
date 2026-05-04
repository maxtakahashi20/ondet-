import { Check, Circle, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { carrierInitial, carrierLabel, carrierRingClass } from '@/lib/carrier';
import { formatBrl } from '@/lib/money';
import { buildTimelineForOrder } from '@/lib/order-timeline';
import { orderStatusBadgeClass, orderStatusLabel } from '@/lib/order-status';
import { formatDate } from '@/utils/formatDate';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/stores/favoritesStore';
import type { Order, OrderTimelineStep } from '@/types/order.types';

function stepIcon(step: OrderTimelineStep) {
  if (step.state === 'done') {
    return (
      <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40">
        <Check className="size-3.5" />
      </span>
    );
  }
  if (step.state === 'current') {
    return (
      <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary ring-1 ring-primary/50">
        <Circle className="size-3 fill-primary" />
      </span>
    );
  }
  if (step.state === 'warning') {
    return (
      <span className="flex size-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40">
        <MapPin className="size-3.5" />
      </span>
    );
  }
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border">
      <Circle className="size-3" />
    </span>
  );
}

interface OrderDetailCardProps {
  order: Order;
}

export function OrderDetailCard({ order }: OrderDetailCardProps) {
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => !!s.ids[order.id]);
  const steps = buildTimelineForOrder(order);

  return (
    <Card className="overflow-hidden border-border/60 bg-card/60 shadow-sm">
      <CardHeader className="space-y-0 pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div
              className={cn(
                'flex size-14 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ring-1',
                carrierRingClass(order.carrier),
              )}
              aria-hidden
            >
              {carrierInitial(order.carrier)}
            </div>
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold leading-tight text-foreground">
                  {order.title}
                </h2>
                <Badge
                  variant="outline"
                  className={cn('border', orderStatusBadgeClass(order.status))}
                >
                  {orderStatusLabel(order.status)}
                </Badge>
              </div>
              <p className="font-mono text-sm text-muted-foreground">{order.code}</p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary/80" />
                <span>{order.location}</span>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={cn(
                'text-amber-400 hover:text-amber-300',
                isFavorite && 'text-amber-400',
              )}
              aria-pressed={isFavorite}
              aria-label={
                isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
              }
              onClick={() => toggle(order.id)}
            >
              <Star
                className={cn('size-5', isFavorite && 'fill-amber-400 text-amber-400')}
              />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-0">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border/60 bg-background/40 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">Transportadora</p>
            <p className="text-sm font-medium">{carrierLabel(order.carrier)}</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/40 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">Valor declarado</p>
            <p className="text-sm font-medium tabular-nums">
              {formatBrl(order.valueBrl)}
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/40 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">Pedido em</p>
            <p className="text-sm font-medium">{formatDate(order.createdAt)}</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/40 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">Última atualização</p>
            <p className="text-sm font-medium">{order.updatedLabel}</p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Linha do tempo
          </h3>
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {stepIcon(step)}
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'my-1 w-px flex-1 min-h-[1.25rem]',
                        step.state === 'done'
                          ? 'bg-emerald-500/40'
                          : 'bg-border',
                      )}
                    />
                  )}
                </div>
                <div className="pb-5 pt-0.5">
                  <p className="text-sm font-medium leading-none">{step.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{step.dateLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <p className="text-xs text-muted-foreground">
          Linha do tempo atualizada conforme Correios e transportadoras registram cada
          movimento do objeto.
        </p>
      </CardContent>
    </Card>
  );
}
