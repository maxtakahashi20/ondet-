import { NavLink, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import brandLogo from '@/assets/aondevcta.png';
import { NAV_ITEMS } from '@/config/nav';
import { Button } from '@/components/ui/button';
import { useShellDialogs } from '@/contexts/shell-dialogs-context';
import { useNotificationPromoStore } from '@/stores/notificationPromoStore';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

function isNavActive(pathname: string, to: string) {
  if (to === '/dashboard') return pathname === '/dashboard';
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AppSidebar() {
  const { pathname } = useLocation();
  const { openNotificationsInfo } = useShellDialogs();
  const promoDismissed = useNotificationPromoStore((s) => s.dismissed);

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="overflow-hidden rounded-tl-2xl border-r border-sidebar-border"
    >
      <SidebarHeader className="shrink-0 gap-0 overflow-hidden border-b border-sidebar-border/40 p-0">
        <NavLink
          to="/dashboard"
          end
          className="flex h-[4.75rem] w-full min-w-0 items-center justify-center bg-sidebar outline-none ring-sidebar-ring transition-opacity hover:opacity-95 focus-visible:ring-2 group-data-[collapsible=icon]:h-12"
        >
          <img
            src={brandLogo}
            alt="Onde Tá?"
            width={280}
            height={80}
            className="h-full w-full object-contain object-center group-data-[collapsible=icon]:object-cover"
            draggable={false}
          />
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-3 pb-4 pt-2">
        <SidebarMenu className="gap-1.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const active = isNavActive(pathname, to);
            return (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={label}
                  className="h-10 rounded-xl px-3 text-sidebar-foreground transition-colors hover:bg-sidebar-accent/90 data-[active=true]:bg-sidebar-primary data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-sm data-[active=true]:hover:bg-sidebar-primary/92 [&_svg]:size-[18px] data-[active=true]:[&_svg]:text-sidebar-primary-foreground"
                >
                  <NavLink to={to} end={to === '/dashboard'}>
                    <Icon className="size-[18px]" />
                    <span>{label}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {!promoDismissed && (
        <SidebarFooter className="border-t border-sidebar-border/50 p-3 group-data-[collapsible=icon]:hidden">
          <div className="rounded-2xl border border-sidebar-border bg-gradient-to-br from-sidebar-primary/25 via-sidebar-accent/30 to-card p-4 shadow-sm">
            <div className="mb-3 flex justify-center">
              <div className="rounded-2xl bg-sidebar-primary/20 p-3 ring-1 ring-sidebar-primary/30">
                <Bell className="size-6 text-sidebar-primary" aria-hidden />
              </div>
            </div>
            <p className="text-center text-sm font-semibold text-sidebar-foreground">
              Ative as notificações
            </p>
            <p className="mt-1 text-center text-xs leading-relaxed text-sidebar-foreground/70">
              Receba atualizações sobre mudanças de status e entregas.
            </p>
            <Button
              className="mt-4 w-full"
              size="sm"
              type="button"
              onClick={openNotificationsInfo}
            >
              Ativar agora
            </Button>
          </div>
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  );
}

