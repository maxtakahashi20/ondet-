export type OrderStatus =
  | 'em_transito'
  | 'saiu_entrega'
  | 'entregue'
  | 'atrasado';

export type CarrierId = 'correios' | 'shopee' | 'jadlog' | 'mercadolivre';

export interface OrderTimelineStep {
  title: string;
  dateLabel: string;
  state: 'done' | 'current' | 'pending' | 'warning';
}

export interface Order {
  id: string;
  code: string;
  title: string;
  carrier: CarrierId;
  status: OrderStatus;
  location: string;
  updatedLabel: string;
  createdAt: string;
  /** Valor do pedido em reais */
  valueBrl: number;
}
