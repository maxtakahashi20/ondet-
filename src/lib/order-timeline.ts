import type { Order, OrderTimelineStep } from '@/types/order.types';

export function buildTimelineForOrder(order: Order): OrderTimelineStep[] {
  const posted: OrderTimelineStep = {
    title: 'Postagem / coleta',
    dateLabel: formatShort(order.createdAt),
    state: 'done',
  };

  const transit: OrderTimelineStep = {
    title: 'Em trânsito',
    dateLabel:
      order.status === 'em_transito' ||
      order.status === 'saiu_entrega' ||
      order.status === 'entregue'
        ? order.updatedLabel
        : '—',
    state:
      order.status === 'em_transito'
        ? 'current'
        : order.status === 'atrasado'
          ? 'warning'
          : 'done',
  };

  const outForDelivery: OrderTimelineStep = {
    title: 'Rota de entrega',
    dateLabel:
      order.status === 'saiu_entrega' || order.status === 'entregue'
        ? order.updatedLabel
        : 'Aguardando',
    state:
      order.status === 'saiu_entrega'
        ? 'current'
        : order.status === 'entregue'
          ? 'done'
          : order.status === 'atrasado'
            ? 'warning'
            : 'pending',
  };

  const delivered: OrderTimelineStep = {
    title: 'Entrega',
    dateLabel: order.status === 'entregue' ? order.updatedLabel : 'Prevista',
    state: order.status === 'entregue' ? 'done' : 'pending',
  };

  if (order.status === 'atrasado') {
    transit.state = 'warning';
    outForDelivery.state = 'warning';
    outForDelivery.dateLabel = 'Atraso na transferência';
  }

  return [posted, transit, outForDelivery, delivered];
}

function formatShort(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}
