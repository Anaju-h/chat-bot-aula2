import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  Bot, 
  Users, 
  Bell, 
  Shield, 
  Database, 
  Zap,
  Save,
  TestTube
} from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    botName: "Assistente Virtual",
    botPersonality: "professional",
    responseTime: "2",
    autoGreeting: true,
    enableNotifications: true,
    enableAnalytics: true,
    maxSessionTime: "30",
    fallbackToHuman: true,
    confidenceThreshold: "0.7"
  });

  const handleSave = (section: string) => {
    toast({
      title: "Configurações salvas",
      description: `Configurações de ${section} foram atualizadas com sucesso.`,
    });
  };

  const handleTestBot = () => {
    toast({
      title: "Teste iniciado",
      description: "Enviando mensagem de teste para o bot...",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b bg-background">
            <div className="container flex h-14 items-center px-4">
              <SidebarTrigger className="mr-4" />
              <h1 className="font-semibold">Configurações</h1>
            </div>
          </div>
          
          <div className="container space-y-6 p-6">
            <Tabs defaultValue="bot" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="bot">
                  <Bot className="h-4 w-4 mr-2" />
                  Bot
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="h-4 w-4 mr-2" />
                  Usuários
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="advanced">
                  <Shield className="h-4 w-4 mr-2" />
                  Avançado
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bot" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      Configurações do Bot
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="botName">Nome do Bot</Label>
                        <Input
                          id="botName"
                          value={settings.botName}
                          onChange={(e) => setSettings({...settings, botName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="responseTime">Tempo de Resposta (segundos)</Label>
                        <Input
                          id="responseTime"
                          type="number"
                          value={settings.responseTime}
                          onChange={(e) => setSettings({...settings, responseTime: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="personality">Personalidade do Bot</Label>
                      <Textarea
                        id="personality"
                        placeholder="Descreva como o bot deve se comportar e responder..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Saudação Automática</Label>
                          <p className="text-sm text-muted-foreground">
                            Enviar mensagem de boas-vindas automaticamente
                          </p>
                        </div>
                        <Switch
                          checked={settings.autoGreeting}
                          onCheckedChange={(checked) => setSettings({...settings, autoGreeting: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Fallback para Humano</Label>
                          <p className="text-sm text-muted-foreground">
                            Transferir para atendente quando não conseguir responder
                          </p>
                        </div>
                        <Switch
                          checked={settings.fallbackToHuman}
                          onCheckedChange={(checked) => setSettings({...settings, fallbackToHuman: checked})}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handleTestBot}>
                        <TestTube className="h-4 w-4 mr-2" />
                        Testar Bot
                      </Button>
                      <Button onClick={() => handleSave("bot")}>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="confidence">Limite de Confiança</Label>
                        <Input
                          id="confidence"
                          value={settings.confidenceThreshold}
                          onChange={(e) => setSettings({...settings, confidenceThreshold: e.target.value})}
                        />
                        <p className="text-xs text-muted-foreground">
                          Valor entre 0 e 1. Respostas abaixo deste valor serão escaladas.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sessionTime">Tempo Máximo de Sessão (min)</Label>
                        <Input
                          id="sessionTime"
                          type="number"
                          value={settings.maxSessionTime}
                          onChange={(e) => setSettings({...settings, maxSessionTime: e.target.value})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gerenciamento de Usuários
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Admin</h4>
                        <p className="text-sm text-muted-foreground">admin@exemplo.com</p>
                      </div>
                      <Badge>Administrador</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Atendente 1</h4>
                        <p className="text-sm text-muted-foreground">atendente1@exemplo.com</p>
                      </div>
                      <Badge variant="secondary">Atendente</Badge>
                    </div>

                    <Button className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Adicionar Usuário
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Configurações de Notificação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações por Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber alertas sobre o sistema por email
                        </p>
                      </div>
                      <Switch
                        checked={settings.enableNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analytics</Label>
                        <p className="text-sm text-muted-foreground">
                          Coletar dados de uso para melhorar o serviço
                        </p>
                      </div>
                      <Switch
                        checked={settings.enableAnalytics}
                        onCheckedChange={(checked) => setSettings({...settings, enableAnalytics: checked})}
                      />
                    </div>

                    <Button onClick={() => handleSave("notificações")}>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Configurações Avançadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Backup da Base de Conhecimento</Label>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          Fazer Backup
                        </Button>
                        <Button variant="outline">
                          Restaurar Backup
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Logs do Sistema</Label>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          Visualizar Logs
                        </Button>
                        <Button variant="outline">
                          Exportar Logs
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-destructive">Zona de Perigo</Label>
                      <p className="text-sm text-muted-foreground">
                        Estas ações são irreversíveis. Use com cuidado.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="destructive" size="sm">
                          Resetar Configurações
                        </Button>
                        <Button variant="destructive" size="sm">
                          Limpar Base de Dados
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}