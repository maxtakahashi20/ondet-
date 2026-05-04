import {
  BarChart3,
  Bell,
  LayoutDashboard,
  Package,
  Settings,
  Star,
  History,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/minhas-encomendas', label: 'Minhas Encomendas', icon: Package },
  { to: '/favoritos', label: 'Favoritos', icon: Star },
  { to: '/alertas', label: 'Alertas', icon: Bell },
  { to: '/historico', label: 'Histórico', icon: History },
  { to: '/estatisticas', label: 'Estatísticas', icon: BarChart3 },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
];
