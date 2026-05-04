import { BellRing, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShellDialogs } from '@/contexts/shell-dialogs-context';

export function NotificationBanner() {
  const { openNotificationsInfo } = useShellDialogs();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/30 via-primary/20 to-sky-500/20 p-5 shadow-sm ring-1 ring-primary/20">
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="hidden rounded-2xl bg-background/20 p-3 ring-1 ring-white/10 sm:flex">
            <Smartphone className="size-7 text-primary-foreground" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">
              Fique sempre atualizado!
            </p>
            <p className="mt-1 max-w-prose text-sm text-muted-foreground">
              Liga os avisos e deixa o painel te chamar quando o pacote mudar de etapa.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:pl-2">
          <div className="flex sm:hidden">
            <BellRing className="size-5 text-primary" />
          </div>
          <Button
            className="w-full sm:w-auto"
            type="button"
            onClick={openNotificationsInfo}
          >
            Ativar notificações
          </Button>
        </div>
      </div>
    </div>
  );
}
