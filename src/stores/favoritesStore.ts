import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  ids: Record<string, boolean>;
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: {
        'order-ps5': true,
        'order-phone': true,
        'order-book': true,
      },
      toggle: (id: string) =>
        set((s) => ({
          ids: { ...s.ids, [id]: !s.ids[id] },
        })),
      isFavorite: (id: string) => !!get().ids[id],
    }),
    { name: 'ondeta-favorites' },
  ),
);
