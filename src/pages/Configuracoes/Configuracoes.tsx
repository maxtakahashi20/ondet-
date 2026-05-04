import { useState } from 'react';
import {
  Bell,
  Globe,
  Moon,
  Shield,
  Smartphone,
  User,
} from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserStore } from '@/stores/userStore';

function Configuracoes() {
  const [saveHint, setSaveHint] = useState<string | null>(null);
  const name = useUserStore((s) => s.name);
  const email = useUserStore((s) => s.email);
  const setName = useUserStore((s) => s.setName);
  const setEmail = useUserStore((s) => s.setEmail);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Conta, alertas, privacidade e aparência — o que você mudar fica guardado neste
          aparelho.
        </p>
      </div>

      <Tabs defaultValue="conta" className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-xl bg-muted/50 p-1 sm:w-auto">
          <TabsTrigger value="conta" className="gap-1.5">
            <User className="size-3.5" />
            Conta
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-1.5">
            <Bell className="size-3.5" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="privacidade" className="gap-1.5">
            <Shield className="size-3.5" />
            Privacidade
          </TabsTrigger>
          <TabsTrigger value="aparencia" className="gap-1.5">
            <Moon className="size-3.5" />
            Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conta" className="mt-6 space-y-4">
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Perfil</CardTitle>
              <CardDescription>Nome e e-mail usados no painel e nos alertas.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:max-w-md">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input
                  id="nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="w-fit"
                  onClick={() => {
                    setSaveHint('Alterações salvas.');
                    window.setTimeout(() => setSaveHint(null), 4000);
                  }}
                >
                  Salvar alterações
                </Button>
                {saveHint && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">{saveHint}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="mt-6 space-y-4">
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Canais</CardTitle>
              <CardDescription>Escolha como deseja ser avisado.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Smartphone className="size-4 text-muted-foreground" />
                    Push no navegador
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Notificações do sistema quando o rastreio mudar.
                  </p>
                </div>
                <Switch defaultChecked id="push" />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Bell className="size-4 text-muted-foreground" />
                    Resumo por e-mail
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Um digest semanal com status das encomendas.
                  </p>
                </div>
                <Switch id="email-digest" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacidade" className="mt-6 space-y-4">
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Dados</CardTitle>
              <CardDescription>Decida como seus dados entram nas estatísticas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Compartilhar estatísticas anônimas</p>
                  <p className="text-xs text-muted-foreground">
                    Ajuda a afinar estimativas de entrega para todo mundo.
                  </p>
                </div>
                <Switch defaultChecked id="analytics" />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Lista de dispositivos confiáveis</p>
                  <p className="text-xs text-muted-foreground">
                    Lista dos navegadores e aparelhos nos quais você já acessou a conta.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.alert(
                      'Por enquanto só aparece este navegador. Novos acessos passam a listar aqui.',
                    )
                  }
                >
                  Gerenciar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aparencia" className="mt-6 space-y-4">
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Tema</CardTitle>
              <CardDescription>
                Hoje o app fica em modo escuro o tempo todo; modo claro vem numa próxima
                versão.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Moon className="size-4 text-muted-foreground" />
                  Modo escuro (atual)
                </div>
                <Switch defaultChecked disabled id="dark" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Globe className="size-4 text-muted-foreground" />
                  Idioma: Português (BR)
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    window.alert('Por ora só temos português (Brasil). Outros idiomas entram na sequência.')
                  }
                >
                  Alterar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Configuracoes;
