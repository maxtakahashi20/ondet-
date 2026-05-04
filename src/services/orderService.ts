import type { Order } from '@/types/order.types';

const seedOrders: Order[] = [
  {
    id: 'order-1',
    code: 'BR123456789BR',
    title: 'Teclado Mecânico',
    carrier: 'correios',
    status: 'em_transito',
    location: 'Centro de Distribuição - São Paulo/SP',
    updatedLabel: 'Hoje, 10:23',
    createdAt: '2026-04-28T10:23:00.000Z',
    valueBrl: 459.9,
  },
  {
    id: 'order-2',
    code: 'SP987654321SP',
    title: 'Mouse Gamer RGB',
    carrier: 'shopee',
    status: 'saiu_entrega',
    location: 'Em rota - Campinas/SP',
    updatedLabel: 'Ontem, 16:40',
    createdAt: '2026-04-27T16:40:00.000Z',
    valueBrl: 129.9,
  },
  {
    id: 'order-3',
    code: 'JD1122334455',
    title: 'Monitor 27"',
    carrier: 'jadlog',
    status: 'em_transito',
    location: 'Hub Curitiba - PR',
    updatedLabel: 'Hoje, 08:12',
    createdAt: '2026-05-01T08:12:00.000Z',
    valueBrl: 1899,
  },
  {
    id: 'order-4',
    code: 'ML5566778899',
    title: 'Headset Bluetooth',
    carrier: 'mercadolivre',
    status: 'entregue',
    location: 'Entregue - Belo Horizonte/MG',
    updatedLabel: '28 abr, 14:05',
    createdAt: '2026-04-28T14:05:00.000Z',
    valueBrl: 299,
  },
  {
    id: 'order-5',
    code: 'BR9988776655',
    title: 'Webcam Full HD',
    carrier: 'correios',
    status: 'atrasado',
    location: 'Aguardando retirada',
    updatedLabel: '25 abr, 09:00',
    createdAt: '2026-04-25T09:00:00.000Z',
    valueBrl: 249.9,
  },
  {
    id: 'order-ps5',
    code: 'BR4455667788',
    title: 'PlayStation 5',
    carrier: 'shopee',
    status: 'em_transito',
    location: 'Centro de Distribuição - SP',
    updatedLabel: 'Hoje, 11:02',
    createdAt: '2026-05-01T11:02:00.000Z',
    valueBrl: 4299,
  },
  {
    id: 'order-phone',
    code: 'ML2233445566',
    title: 'Smartphone Galaxy',
    carrier: 'mercadolivre',
    status: 'saiu_entrega',
    location: 'Saiu para entrega - RJ',
    updatedLabel: 'Hoje, 07:55',
    createdAt: '2026-05-01T07:55:00.000Z',
    valueBrl: 2799,
  },
  {
    id: 'order-book',
    code: 'BR3344556677',
    title: 'Livro Técnico',
    carrier: 'correios',
    status: 'entregue',
    location: 'Entregue - Porto Alegre/RS',
    updatedLabel: '30 abr, 18:20',
    createdAt: '2026-04-30T18:20:00.000Z',
    valueBrl: 159.9,
  },
  {
    id: 'order-9',
    code: 'JD8899001122',
    title: 'SSD NVMe 1TB',
    carrier: 'jadlog',
    status: 'entregue',
    location: 'Entregue - Florianópolis/SC',
    updatedLabel: '29 abr, 12:30',
    createdAt: '2026-04-29T12:30:00.000Z',
    valueBrl: 549,
  },
  {
    id: 'order-10',
    code: 'SP5566778899',
    title: 'Cadeira Ergonômica',
    carrier: 'shopee',
    status: 'entregue',
    location: 'Entregue - Brasília/DF',
    updatedLabel: '27 abr, 09:45',
    createdAt: '2026-04-27T09:45:00.000Z',
    valueBrl: 1299,
  },
  {
    id: 'order-11',
    code: 'BR7788990011',
    title: 'Hub USB-C',
    carrier: 'correios',
    status: 'entregue',
    location: 'Entregue - Salvador/BA',
    updatedLabel: '26 abr, 17:10',
    createdAt: '2026-04-26T17:10:00.000Z',
    valueBrl: 89.9,
  },
  {
    id: 'order-12',
    code: 'ML9900112233',
    title: 'Tablet 10"',
    carrier: 'mercadolivre',
    status: 'entregue',
    location: 'Entregue - BH/MG',
    updatedLabel: '01 mai, 06:18',
    createdAt: '2026-05-01T06:18:00.000Z',
    valueBrl: 899,
  },
];

/** Encomendas adicionadas pelo usuário na sessão atual. */
const EXTRA_ORDERS: Order[] = [];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function allOrders(): Order[] {
  return [...seedOrders, ...EXTRA_ORDERS];
}

export const orderService = {
  getAll: async (): Promise<Order[]> => {
    await delay(450);
    return allOrders();
  },

  getById: async (id: string): Promise<Order | null> => {
    await delay(200);
    return allOrders().find((o) => o.id === id) ?? null;
  },

  addOrders: async (orders: Order[]): Promise<Order[]> => {
    await delay(400);
    EXTRA_ORDERS.push(...orders);
    return orders;
  },
};
