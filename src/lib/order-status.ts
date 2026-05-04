import type { OrderStatus } from '@/types/order.types';

export function orderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case 'em_transito':
      return 'Em trânsito';
    case 'saiu_entrega':
      return 'Saiu para entrega';
    case 'entregue':
      return 'Entregue';
    case 'atrasado':
      return 'Atrasado';
    default:
      return status;
  }
}

export function orderStatusBadgeClass(status: OrderStatus): string {
  switch (status) {
    case 'em_transito':
      return 'border-blue-500/35 bg-blue-500/15 text-blue-300';
    case 'saiu_entrega':
      return 'border-amber-500/35 bg-amber-500/15 text-amber-300';
    case 'entregue':
      return 'border-emerald-500/35 bg-emerald-500/15 text-emerald-300';
    case 'atrasado':
      return 'border-red-500/40 bg-red-500/15 text-red-300';
    default:
      return '';
  }
}
