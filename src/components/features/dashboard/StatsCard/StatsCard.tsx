import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  tone: 'blue' | 'amber' | 'emerald' | 'violet';
}

const toneClass: Record<StatsCardProps['tone'], string> = {
  blue: 'bg-blue-500/15 text-blue-300 ring-blue-500/30',
  amber: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  violet: 'bg-violet-500/15 text-violet-300 ring-violet-500/30',
};

export function StatsCard({ title, value, description, icon: Icon, tone }: StatsCardProps) {
  return (
    <Card className="border-border/60 bg-card/50 shadow-sm">
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0 space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1',
            toneClass[tone],
          )}
        >
          <Icon className="size-5" aria-hidden />
        </div>
      </CardContent>
    </Card>
  );
}
