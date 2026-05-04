import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAlertsFeedStore } from '@/stores/alertsFeedStore';

const INTERVAL_MS = 5 * 60 * 1000;

export function PeriodicAlerts() {
  const appendPeriodic = useAlertsFeedStore((s) => s.appendPeriodic);

  useEffect(() => {
    const id = window.setInterval(() => {
      const alert = appendPeriodic();
      toast(alert.title, {
        description: alert.description,
      });
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [appendPeriodic]);

  return null;
}
