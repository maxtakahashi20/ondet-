import type { CatalogProduct } from '@/data/catalogProducts';
import type { Order } from '@/types/order.types';

function randomTrackingCode(): string {
  const n = Math.floor(100000000 + Math.random() * 900000000);
  return `BR${n}BR`;
}

export function createOrdersFromCatalog(selection: CatalogProduct[]): Order[] {
  const createdAt = new Date().toISOString();
  const base = Date.now();
  return selection.map((p, i) => ({
    id: `order-new-${base}-${i}`,
    code: randomTrackingCode(),
    title: p.title,
    carrier: p.carrier,
    status: 'em_transito' as const,
    location: 'Pedido registrado — aguardando coleta no centro logístico',
    updatedLabel: 'Agora',
    createdAt,
    valueBrl: p.valueBrl,
  }));
}
