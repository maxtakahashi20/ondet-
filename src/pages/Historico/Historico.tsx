import { recentPurchases } from '@/data/mockPurchaseHistory';
import { carrierLabel } from '@/lib/carrier';
import { formatBrl } from '@/lib/money';
import { formatDate } from '@/utils/formatDate';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function Historico() {
  const rows = [...recentPurchases].sort(
    (a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime(),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Histórico</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Suas últimas compras concluídas, com valores e datas de entrega.
        </p>
      </div>

      <Card className="border-border/60 bg-card/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Compras recentes</CardTitle>
          <CardDescription>
            Pedido, transportadora, valores e datas de compra e entrega.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Transportadora</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Compra</TableHead>
                <TableHead>Entrega</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.title}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {row.code}
                  </TableCell>
                  <TableCell>{carrierLabel(row.carrier)}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatBrl(row.valueBrl)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(row.purchasedAt)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {row.deliveredAt ? formatDate(row.deliveredAt) : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Historico;
