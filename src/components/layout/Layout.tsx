import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header/Header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ShellDialogsProvider } from '@/contexts/shell-dialogs-context';
import { PeriodicAlerts } from '@/components/layout/PeriodicAlerts';

export function Layout() {
  return (
    <SidebarProvider defaultOpen>
      <ShellDialogsProvider>
        <PeriodicAlerts />
        <AppSidebar />
        <SidebarInset className="flex min-h-svh flex-col bg-background font-sans text-foreground">
          <Header />
          <div className="flex flex-1 flex-col overflow-x-hidden">
            <div className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 md:px-6 lg:px-8 lg:py-8">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </ShellDialogsProvider>
    </SidebarProvider>
  );
}
