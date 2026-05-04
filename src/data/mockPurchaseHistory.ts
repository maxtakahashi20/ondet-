import type { CarrierId } from '@/types/order.types';

export interface PurchaseHistoryEntry {
  id: string;
  title: string;
  code: string;
  carrier: CarrierId;
  purchasedAt: string;
  deliveredAt: string | null;
  valueBrl: number;
}

export const recentPurchases: PurchaseHistoryEntry[] = [
  {
    id: 'ph-1',
    title: 'Headset Bluetooth',
    code: 'ML5566778899',
    carrier: 'mercadolivre',
    purchasedAt: '2026-04-20T11:00:00.000Z',
    deliveredAt: '2026-04-28T14:05:00.000Z',
    valueBrl: 299,
  },
  {
    id: 'ph-2',
    title: 'Livro Técnico',
    code: 'BR3344556677',
    carrier: 'correios',
    purchasedAt: '2026-04-18T09:30:00.000Z',
    deliveredAt: '2026-04-30T18:20:00.000Z',
    valueBrl: 159.9,
  },
  {
    id: 'ph-3',
    title: 'SSD NVMe 1TB',
    code: 'JD8899001122',
    carrier: 'jadlog',
    purchasedAt: '2026-04-15T14:20:00.000Z',
    deliveredAt: '2026-04-29T12:30:00.000Z',
    valueBrl: 549,
  },
  {
    id: 'ph-4',
    title: 'Cadeira Ergonômica',
    code: 'SP5566778899',
    carrier: 'shopee',
    purchasedAt: '2026-04-10T16:45:00.000Z',
    deliveredAt: '2026-04-27T09:45:00.000Z',
    valueBrl: 1299,
  },
  {
    id: 'ph-5',
    title: 'Hub USB-C',
    code: 'BR7788990011',
    carrier: 'correios',
    purchasedAt: '2026-04-08T10:00:00.000Z',
    deliveredAt: '2026-04-26T17:10:00.000Z',
    valueBrl: 89.9,
  },
  {
    id: 'ph-6',
    title: 'Tablet 10"',
    code: 'ML9900112233',
    carrier: 'mercadolivre',
    purchasedAt: '2026-04-22T13:10:00.000Z',
    deliveredAt: '2026-05-01T06:18:00.000Z',
    valueBrl: 899,
  },
];
