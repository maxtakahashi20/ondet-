import { Bell } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AlertSeverity, MockAlert } from '@/data/mockAlerts';
import { MOCK_ALERTS } from '@/data/mockAlerts';

export type AlertPlain = Omit<MockAlert, 'icon'>;

const PERIODIC_TEMPLATES: Array<
  Pick<MockAlert, 'title' | 'description' | 'severity'>
> = [
  {
    title: 'Movimento nos Correios',
    description: 'Pelo menos uma encomenda recebeu atualização de rota.',
    severity: 'info',
  },
  {
    title: 'Olho no prazo',
    description: 'Vale conferir se alguma entrega está perto do limite.',
    severity: 'warning',
  },
  {
    title: 'Tudo em dia',
    description: 'Nada crítico por agora — avisamos se pintar algo novo.',
    severity: 'info',
  },
];

function formatNowLabel(): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date());
}

function buildInitialReadMap(): Record<string, boolean> {
  const m: Record<string, boolean> = {};
  for (const a of MOCK_ALERTS) {
    m[a.id] = a.read;
  }
  return m;
}

function toMockAlert(plain: AlertPlain): MockAlert {
  return { ...plain, icon: Bell };
}

interface AlertsFeedState {
  dynamicAlertsData: AlertPlain[];
  readMap: Record<string, boolean>;
  appendPeriodic: () => MockAlert;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const useAlertsFeedStore = create<AlertsFeedState>()(
  persist(
    (set, get) => ({
      dynamicAlertsData: [],
      readMap: buildInitialReadMap(),

      appendPeriodic: () => {
        const template =
          PERIODIC_TEMPLATES[
            Math.floor(Math.random() * PERIODIC_TEMPLATES.length)
          ]!;
        const plain: AlertPlain = {
          id: `auto-${Date.now()}`,
          title: template.title,
          description: template.description,
          timeLabel: formatNowLabel(),
          severity: template.severity as AlertSeverity,
          read: false,
        };
        set((s) => ({
          dynamicAlertsData: [plain, ...s.dynamicAlertsData].slice(0, 80),
          readMap: { ...s.readMap, [plain.id]: false },
        }));
        return toMockAlert(plain);
      },

      markRead: (id) =>
        set((s) => ({
          readMap: { ...s.readMap, [id]: true },
        })),

      markAllRead: () => {
        const ids = new Set<string>();
        MOCK_ALERTS.forEach((a) => ids.add(a.id));
        get().dynamicAlertsData.forEach((a) => ids.add(a.id));
        set((s) => {
          const next = { ...s.readMap };
          ids.forEach((id) => {
            next[id] = true;
          });
          return { readMap: next };
        });
      },
    }),
    {
      name: 'ondeta-alerts-feed',
      partialize: (s) => ({
        dynamicAlertsData: s.dynamicAlertsData,
        readMap: s.readMap,
      }),
      merge: (persistedState, currentState) => {
        const p = persistedState as Partial<AlertsFeedState> | undefined;
        if (!p) return currentState;
        return {
          ...currentState,
          dynamicAlertsData:
            p.dynamicAlertsData ?? currentState.dynamicAlertsData,
          readMap: {
            ...buildInitialReadMap(),
            ...p.readMap,
          },
        };
      },
    },
  ),
);

export function mergeAlertsPlain(dynamicAlertsData: AlertPlain[]): MockAlert[] {
  const dynamic = dynamicAlertsData.map(toMockAlert);
  return [...dynamic, ...MOCK_ALERTS];
}

export function selectAllAlerts(state: AlertsFeedState): MockAlert[] {
  return mergeAlertsPlain(state.dynamicAlertsData);
}

export function selectUnreadCount(state: AlertsFeedState): number {
  const alerts = selectAllAlerts(state);
  return alerts.filter((a) => !state.readMap[a.id]).length;
}
