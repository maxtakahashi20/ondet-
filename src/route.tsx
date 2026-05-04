import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Alertas from '@/pages/Alertas/Alertas';
import Configuracoes from '@/pages/Configuracoes/Configuracoes';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Estatisticas from '@/pages/Estatisticas/Estatisticas';
import Favoritos from '@/pages/Favoritos/Favoritos';
import Historico from '@/pages/Historico/Historico';
import MinhasEncomendas from '@/pages/MinhasEncomendas/MinhasEncomendas';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="minhas-encomendas" element={<MinhasEncomendas />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="alertas" element={<Alertas />} />
        <Route path="historico" element={<Historico />} />
        <Route path="estatisticas" element={<Estatisticas />} />
        <Route path="configuracoes" element={<Configuracoes />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
