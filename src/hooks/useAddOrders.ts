import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import type { Order } from '@/types/order.types';

export function useAddOrders() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orders: Order[]) => orderService.addOrders(orders),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
