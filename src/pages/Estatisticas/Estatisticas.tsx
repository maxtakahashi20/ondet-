import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrders } from '@/hooks/useOrders';
import { carrierLabel } from '@/lib/carrier';
import { orderStatusLabel } from '@/lib/order-status';
import type { CarrierId, OrderStatus } from '@/types/order.types';
import { Skeleton } from '@/components/ui/skeleton';

const tooltipProps = {
  contentStyle: {
    backgroundColor: 'oklch(0.22 0.03 264)',
    border: '1px solid oklch(1 0 0 / 12%)',
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: 'oklch(0.92 0.01 264)' },
  itemStyle: { color: 'oklch(0.92 0.01 264)' },
};

const PIE_COLORS = ['#3b82f6', '#f59e0b', '#22c55e', '#a855f7', '#ef4444'];

const shippingByMonth = [
  { month: 'Jan', envios: 3 },
  { month: 'Fev', envios: 4 },
  { month: 'Mar', envios: 5 },
  { month: 'Abr', envios: 8 },
  { month: 'Mai', envios: 7 },
  { month: 'Jun', envios: 6 },
];

function Estatisticas() {
  const { data: orders, isLoading } = useOrders();

  const statusChart = useMemo(() => {
    if (!orders) return [];
    const map = new Map<OrderStatus, number>();
    for (const o of orders) {
      map.set(o.status, (map.get(o.status) ?? 0) + 1);
    }
    return [...map.entries()].map(([status, value]) => ({
      name: orderStatusLabel(status),
      value,
      status,
    }));
  }, [orders]);

  const carrierChart = useMemo(() => {
    if (!orders) return [];
    const map = new Map<CarrierId, number>();
    for (const o of orders) {
      map.set(o.carrier, (map.get(o.carrier) ?? 0) + 1);
    }
    return [...map.entries()].map(([carrier, total]) => ({
      name: carrierLabel(carrier),
      total,
    }));
  }, [orders]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Estatísticas</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Números das suas encomendas e como o volume de envios se comportou nos últimos
          meses.
        </p>
      </div>

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      )}

      {!isLoading && orders && (
        <Tabs defaultValue="visao" className="w-full">
          <TabsList variant="line" className="w-full max-w-md">
            <TabsTrigger value="visao">Visão geral</TabsTrigger>
            <TabsTrigger value="tendencia">Tendência</TabsTrigger>
          </TabsList>

          <TabsContent value="visao" className="mt-4 space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="border-border/60 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base">Por status</CardTitle>
                  <CardDescription>Distribuição das {orders.length} encomendas ativas</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusChart}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={2}
                      >
                        {statusChart.map((_, i) => (
                          <Cell
                            key={i}
                            fill={PIE_COLORS[i % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip {...tooltipProps} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base">Por transportadora</CardTitle>
                  <CardDescription>Quantidade de pedidos por transportadora</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={carrierChart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} width={32} tick={{ fontSize: 11 }} />
                      <Tooltip {...tooltipProps} />
                      <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tendencia" className="mt-4">
            <Card className="border-border/60 bg-card/50">
              <CardHeader>
                <CardTitle className="text-base">Envios por mês</CardTitle>
                <CardDescription>
                  Panorama rápido para ver se o ritmo aumentou ou deu uma segurada.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[320px] pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={shippingByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} width={32} tick={{ fontSize: 11 }} />
                    <Tooltip {...tooltipProps} />
                    <Line
                      type="monotone"
                      dataKey="envios"
                      name="Envios"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default Estatisticas;
