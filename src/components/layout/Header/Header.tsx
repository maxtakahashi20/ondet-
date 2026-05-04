import { useNavigate } from 'react-router-dom';
import {
  Bell,
  ChevronDown,
  Plus,
  Search,
  User,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useShellDialogs } from '@/contexts/shell-dialogs-context';
import { selectUnreadCount, useAlertsFeedStore } from '@/stores/alertsFeedStore';
import { useUserStore } from '@/stores/userStore';

export function Header() {
  const navigate = useNavigate();
  const { openNewOrder, requestLogout } = useShellDialogs();
  const name = useUserStore((s) => s.name);
  const unreadAlerts = useAlertsFeedStore(selectUnreadCount);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 min-w-0 overflow-visible border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-3 py-2 pl-4 pr-4 md:gap-4 md:pl-6 md:pr-6">
        <SidebarTrigger className="size-9 shrink-0 text-foreground" />

        <div className="relative min-w-0 flex-1 md:max-w-2xl md:mx-auto">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-9 rounded-lg border-border/80 bg-card/40 py-1.5 pl-8 text-sm shadow-inner"
            placeholder="Buscar encomendas..."
            aria-label="Buscar encomendas"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            size="sm"
            className="hidden h-8 gap-1.5 px-2.5 text-xs sm:inline-flex"
            type="button"
            onClick={openNewOrder}
          >
            <Plus className="size-3.5" />
            Nova Encomenda
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            className="relative sm:hidden"
            type="button"
            onClick={openNewOrder}
            aria-label="Nova encomenda"
          >
            <Plus className="size-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="relative"
            type="button"
            onClick={() => navigate('/alertas')}
            aria-label="Ver alertas"
          >
            <Bell className="size-[18px]" />
            {unreadAlerts > 0 && (
              <Badge
                className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[9px] leading-none"
                variant="destructive"
              >
                {unreadAlerts > 99 ? '99+' : unreadAlerts}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 gap-1.5 px-1.5"
                type="button"
                aria-label="Conta"
              >
                <Avatar className="size-7">
                  <AvatarFallback className="bg-primary/15 text-[10px] font-semibold text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden max-w-[120px] truncate text-xs font-medium md:inline">
                  {name}
                </span>
                <ChevronDown className="hidden size-3.5 opacity-60 md:inline" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{name}</span>
                  <span className="text-xs text-muted-foreground">Conta</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
                <User className="mr-2 size-4" />
                Perfil e configurações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={requestLogout}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
