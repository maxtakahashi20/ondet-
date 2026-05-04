import type { CarrierId } from '@/types/order.types';

export interface CatalogProduct {
  id: string;
  title: string;
  description: string;
  carrier: CarrierId;
  valueBrl: number;
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'cat-1',
    title: 'Echo Dot 5ª geração',
    description: 'Smart speaker com Alexa',
    carrier: 'mercadolivre',
    valueBrl: 379,
  },
  {
    id: 'cat-2',
    title: 'Fone Bluetooth Anker',
    description: 'Cancelamento de ruído',
    carrier: 'shopee',
    valueBrl: 259.9,
  },
  {
    id: 'cat-3',
    title: 'Kit Cabos USB-C',
    description: '3 unidades 1m',
    carrier: 'correios',
    valueBrl: 49.9,
  },
  {
    id: 'cat-4',
    title: 'Organizador de mesa',
    description: 'Madeira / MDF',
    carrier: 'jadlog',
    valueBrl: 119,
  },
  {
    id: 'cat-5',
    title: 'Power bank 20.000 mAh',
    description: 'Fast charge 22W',
    carrier: 'mercadolivre',
    valueBrl: 189.9,
  },
  {
    id: 'cat-6',
    title: 'Capa para notebook 15"',
    description: 'Neoprene',
    carrier: 'shopee',
    valueBrl: 79.9,
  },
];
