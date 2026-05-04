import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, Bell, Info, Package } from 'lucide-react';

export type AlertSeverity = 'info' | 'warning' | 'critical';

export interface MockAlert {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  severity: AlertSeverity;
  read: boolean;
  icon: LucideIcon;
}

export const MOCK_ALERTS: MockAlert[] = [
  {
    id: 'a1',
    title: 'Atualização de trânsito',
    description:
      'Sua encomenda BR123456789BR saiu do Centro de Distribuição em São Paulo.',
    timeLabel: 'Hoje, 10:23',
    severity: 'info',
    read: false,
    icon: Package,
  },
  {
    id: 'a2',
    title: 'Atraso detectado',
    description:
      'A entrega da BR9988776655 ultrapassou o prazo estimado. Estamos monitorando.',
    timeLabel: 'Ontem, 18:02',
    severity: 'warning',
    read: false,
    icon: AlertTriangle,
  },
  {
    id: 'a3',
    title: 'Lembrete de retirada',
    description: 'Objeto disponível na agência dos Correios por até 7 dias úteis.',
    timeLabel: '24 abr, 09:12',
    severity: 'warning',
    read: true,
    icon: Bell,
  },
  {
    id: 'a4',
    title: 'Novidade no OndeTá?',
    description: 'Agora você pode favoritar encomendas para acesso rápido no painel.',
    timeLabel: '20 abr, 08:00',
    severity: 'info',
    read: true,
    icon: Info,
  },
];
