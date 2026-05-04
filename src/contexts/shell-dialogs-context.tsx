import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { NewOrderDialog } from '@/components/features/orders/NewOrderDialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useNotificationPromoStore } from '@/stores/notificationPromoStore';

interface ShellDialogsContextValue {
  openNewOrder: () => void;
  openNotificationsInfo: () => void;
  requestLogout: () => void;
}

const ShellDialogsContext = createContext<ShellDialogsContextValue | null>(null);

export function ShellDialogsProvider({ children }: { children: ReactNode }) {
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const dismissNotificationPromo = useNotificationPromoStore((s) => s.dismiss);

  const openNewOrder = useCallback(() => setNewOrderOpen(true), []);
  const openNotificationsInfo = useCallback(() => setNotificationsOpen(true), []);
  const requestLogout = useCallback(() => setLogoutOpen(true), []);

  const value = useMemo(
    () => ({
      openNewOrder,
      openNotificationsInfo,
      requestLogout,
    }),
    [openNewOrder, openNotificationsInfo, requestLogout],
  );

  return (
    <ShellDialogsContext.Provider value={value}>
      {children}
      <NewOrderDialog open={newOrderOpen} onOpenChange={setNewOrderOpen} />

      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle>Notificações ativas</DialogTitle>
            <DialogDescription>
              A partir de agora você recebe avisos aqui quando o status ou o prazo de uma
              encomenda mudar. Nas configurações do sistema você também pode permitir alertas
              no navegador.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                dismissNotificationPromo();
                setNotificationsOpen(false);
              }}
            >
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle>Sair da conta</DialogTitle>
            <DialogDescription>
              Sair encerra sua sessão neste aparelho. Para voltar ao painel, é só entrar de
              novo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setLogoutOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={() => setLogoutOpen(false)}>
              Sair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ShellDialogsContext.Provider>
  );
}

export function useShellDialogs() {
  const ctx = useContext(ShellDialogsContext);
  if (!ctx) {
    throw new Error('useShellDialogs só pode ser usado dentro de ShellDialogsProvider');
  }
  return ctx;
}
