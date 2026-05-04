import { useMemo } from 'react';
import { CheckCircle2, Clock, Package, Truck } from 'lucide-react';
import { FavoritesList } from '@/components/features/favorites/FavoritesList/FavoritesList';
import { NotificationBanner } from '@/components/features/dashboard/NotificationBanner/NotificationBanner';
import { OrderList } from '@/components/features/dashboard/OrderList/OrderList';
import { StatsCard } from '@/components/features/dashboard/StatsCard/StatsCard';
import { TrackingWidget } from '@/components/features/tracking/TrackingWidget/TrackingWidget';
import { useOrders } from '@/hooks/useOrders';
import { useNotificationPromoStore } from '@/stores/notificationPromoStore';
import { useUserStore } from '@/stores/userStore';
import type { Order } from '@/types/order.types';

function computeStats(orders: Order[]) {
  const total = orders.length;
  const emTransito = orders.filter(
    (o) => o.status === 'em_transito' || o.status === 'saiu_entrega',
  ).length;
  const entregues = orders.filter((o) => o.status === 'entregue').length;
  const atrasadas = orders.filter((o) => o.status === 'atrasado').length;
  return { total, emTransito, entregues, atrasadas };
}

function Dashboard() {
  const { data: orders, isLoading } = useOrders();
  const name = useUserStore((s) => s.name);
  const promoDismissed = useNotificationPromoStore((s) => s.dismissed);

  const stats = useMemo(() => (orders ? computeStats(orders) : null), [orders]);
  const previewOrders = orders?.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Bem-vindo de volta, {name.split(' ')[0]}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Acompanhe o status de todas as suas encomendas em um só lugar.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total de Encomendas"
          value={stats?.total ?? '—'}
          description="Todas cadastradas"
          icon={Package}
          tone="blue"
        />
        <StatsCard
          title="Em Trânsito"
          value={stats?.emTransito ?? '—'}
          description="A caminho"
          icon={Truck}
          tone="amber"
        />
        <StatsCard
          title="Entregues"
          value={stats?.entregues ?? '—'}
          description="Concluídas com sucesso"
          icon={CheckCircle2}
          tone="emerald"
        />
        <StatsCard
          title="Atrasadas"
          value={stats?.atrasadas ?? '—'}
          description="Precisam de atenção"
          icon={Clock}
          tone="violet"
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <OrderList orders={previewOrders} isLoading={isLoading} />
          {!promoDismissed && <NotificationBanner />}
        </div>

        <div className="space-y-6">
          <TrackingWidget />
          <FavoritesList orders={orders} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
