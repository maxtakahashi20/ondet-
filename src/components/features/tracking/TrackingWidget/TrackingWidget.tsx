import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const trackingSchema = z.object({
  code: z
    .string()
    .trim()
    .min(8, 'Informe um código com pelo menos 8 caracteres')
    .max(24, 'Código muito longo')
    .regex(/^[A-Za-z0-9]+$/, 'Use apenas letras e números (sem espaços)'),
});

type TrackingForm = z.infer<typeof trackingSchema>;

export function TrackingWidget() {
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<TrackingForm>({
    resolver: zodResolver(trackingSchema),
    defaultValues: { code: '' },
  });

  const onSubmit = (values: TrackingForm) => {
    setMessage(
      `Código ${values.code.toUpperCase()} anotado. Assim que houver movimentação na rede dos Correios ou da transportadora, o status aparece aqui.`,
    );
  };

  return (
    <Card className="border-border/60 bg-card/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Rastreamento Rápido</CardTitle>
        <CardDescription>
          Cole o código e veja o status sem sair do painel.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="tracking-code">Código de rastreamento</Label>
            <Input
              id="tracking-code"
              placeholder="Ex: BR123456789BR"
              autoComplete="off"
              className="h-11 rounded-xl bg-background/40"
              {...form.register('code')}
            />
            {form.formState.errors.code?.message && (
              <p className="text-xs text-destructive" role="alert">
                {form.formState.errors.code.message}
              </p>
            )}
          </div>
          <Button className="w-full" type="submit">
            Rastrear
          </Button>
          {message && (
            <p className="text-xs leading-relaxed text-muted-foreground">{message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
