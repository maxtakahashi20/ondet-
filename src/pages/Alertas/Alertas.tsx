import { useMemo } from 'react';
import { CheckCheck } from 'lucide-react';
import type { MockAlert } from '@/data/mockAlerts';
import {
  mergeAlertsPlain,
  useAlertsFeedStore,
} from '@/stores/alertsFeedStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const severityLabel: Record<MockAlert['severity'], string> = {
  info: 'Informativo',
  warning: 'Atenção',
  critical: 'Urgente',
};

const severityClass: Record<MockAlert['severity'], string> = {
  info: 'border-blue-500/30 bg-blue-500/5',
  warning: 'border-amber-500/40 bg-amber-500/10',
  critical: 'border-red-500/40 bg-red-500/10',
};

function Alertas() {
  const readMap = useAlertsFeedStore((s) => s.readMap);
  const dynamicAlertsData = useAlertsFeedStore((s) => s.dynamicAlertsData);
  const markRead = useAlertsFeedStore((s) => s.markRead);
  const markAllRead = useAlertsFeedStore((s) => s.markAllRead);

  const items = useMemo(() => {
    const all = mergeAlertsPlain(dynamicAlertsData);
    return [...all].sort((a, b) => {
      const ar = readMap[a.id] ? 1 : 0;
      const br = readMap[b.id] ? 1 : 0;
      return ar - br;
    });
  }, [readMap, dynamicAlertsData]);

  const unread = useMemo(
    () => items.filter((a) => !readMap[a.id]).length,
    [items, readMap],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Alertas</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Trânsito, atrasos, retirada na agência e lembretes — os avisos mais recentes
            ficam em cima.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unread > 0 && (
            <Badge variant="secondary" className="font-normal">
              {unread} não lida{unread > 1 ? 's' : ''}
            </Badge>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={markAllRead}
          >
            <CheckCheck className="size-3.5" />
            Marcar tudo como lido
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((alert) => {
          const Icon = alert.icon;
          const isRead = readMap[alert.id] === true;
          return (
            <Card
              key={alert.id}
              className={cn(
                'border transition-colors',
                severityClass[alert.severity],
                !isRead && 'ring-1 ring-primary/25',
              )}
            >
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-xl bg-background/50 ring-1 ring-border/60',
                    !isRead && 'ring-primary/30',
                  )}
                >
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base leading-tight">{alert.title}</CardTitle>
                    <Badge variant="outline" className="text-[10px] font-normal">
                      {severityLabel[alert.severity]}
                    </Badge>
                    {!isRead && (
                      <span className="size-2 rounded-full bg-primary" title="Não lido" />
                    )}
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    {alert.description}
                  </CardDescription>
                </div>
                <div className="shrink-0 text-right text-xs text-muted-foreground">
                  {alert.timeLabel}
                </div>
              </CardHeader>
              <CardContent className="flex justify-end pt-0">
                {!isRead && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => markRead(alert.id)}
                  >
                    Marcar como lido
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Alertas;
