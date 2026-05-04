import type { CarrierId } from '@/types/order.types';

export function carrierInitial(carrier: CarrierId): string {
  switch (carrier) {
    case 'correios':
      return 'C';
    case 'shopee':
      return 'S';
    case 'jadlog':
      return 'J';
    case 'mercadolivre':
      return 'M';
    default:
      return '?';
  }
}

export function carrierLabel(carrier: CarrierId): string {
  switch (carrier) {
    case 'correios':
      return 'Correios';
    case 'shopee':
      return 'Shopee';
    case 'jadlog':
      return 'Jadlog';
    case 'mercadolivre':
      return 'Mercado Livre';
    default:
      return 'Transportadora';
  }
}

export function carrierRingClass(carrier: CarrierId): string {
  switch (carrier) {
    case 'correios':
      return 'bg-amber-500/25 text-amber-200 ring-amber-500/40';
    case 'shopee':
      return 'bg-orange-500/25 text-orange-200 ring-orange-500/40';
    case 'jadlog':
      return 'bg-red-500/25 text-red-200 ring-red-500/40';
    case 'mercadolivre':
      return 'bg-yellow-500/25 text-yellow-200 ring-yellow-500/40';
    default:
      return 'bg-muted text-muted-foreground';
  }
}
