import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationPromoState {
  dismissed: boolean;
  dismiss: () => void;
}

export const useNotificationPromoStore = create<NotificationPromoState>()(
  persist(
    (set) => ({
      dismissed: false,
      dismiss: () => set({ dismissed: true }),
    }),
    { name: 'ondeta-notification-promo' },
  ),
);
