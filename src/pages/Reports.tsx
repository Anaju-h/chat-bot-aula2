import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock,
  Calendar,
  Download,
  Filter
} from "lucide-react";

const conversationData = [
  { day: "Seg", total: 145, resolved: 132, pending: 13 },
  { day: "Ter", total: 189, resolved: 167, pending: 22 },
  { day: "Qua", total: 201, resolved: 185, pending: 16 },
  { day: "Qui", total: 178, resolved: 165, pending: 13 },
  { day: "Sex", total: 234, resolved: 221, pending: 13 },
  { day: "Sáb", total: 98, resolved: 89, pending: 9 },
  { day: "Dom", total: 76, resolved: 71, pending: 5 }
];

const satisfactionData = [
  { name: "Muito Satisfeito", value: 45, color: "#10b981" },
  { name: "Satisfeito", value: 35, color: "#3b82f6" },
  { name: "Neutro", value: 15, color: "#f59e0b" },
  { name: "Insatisfeito", value: 3, color: "#ef4444" },
  { name: "Muito Insatisfeito", value: 2, color: "#dc2626" }
];

const topicsData = [
  { topic: "Cancelamento", count: 234, resolution: 95 },
  { topic: "Informações", count: 189, resolution: 98 },
  { topic: "Entrega", count: 156, resolution: 87 },
  { topic: "Suporte", count: 123, resolution: 92 },
  { topic: "Devolução", count: 98, resolution: 89 }
];

const responseTimeData = [
  { hour: "00:00", avgTime: 45 },
  { hour: "04:00", avgTime: 38 },
  { hour: "08:00", avgTime: 92 },
  { hour: "12:00", avgTime: 156 },
  { hour: "16:00", avgTime: 134 },
  { hour: "20:00", avgTime: 87 }
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b bg-background">
            <div className="container flex h-14 items-center px-4">
              <SidebarTrigger className="mr-4" />
              <h1 className="font-semibold">Relatórios</h1>
            </div>
          </div>
          
          <div className="container space-y-6 p-6">
            {/* Controles superiores */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Últimos 7 dias
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="conversations">Conversas</TabsTrigger>
                <TabsTrigger value="satisfaction">Satisfação</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Métricas principais */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total de Conversas</p>
                          <p className="text-2xl font-bold">1,321</p>
                          <div className="flex items-center text-sm">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500">+12%</span>
                            <span className="text-muted-foreground ml-1">vs semana anterior</span>
                          </div>
                        </div>
                        <MessageSquare className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Taxa de Resolução</p>
                          <p className="text-2xl font-bold">94.2%</p>
                          <div className="flex items-center text-sm">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500">+2.1%</span>
                            <span className="text-muted-foreground ml-1">vs semana anterior</span>
                          </div>
                        </div>
                        <BarChart3 className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Tempo Médio</p>
                          <p className="text-2xl font-bold">2.4min</p>
                          <div className="flex items-center text-sm">
                            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500">-0.3min</span>
                            <span className="text-muted-foreground ml-1">vs semana anterior</span>
                          </div>
                        </div>
                        <Clock className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Satisfação</p>
                          <p className="text-2xl font-bold">4.6/5</p>
                          <div className="flex items-center text-sm">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500">+0.2</span>
                            <span className="text-muted-foreground ml-1">vs semana anterior</span>
                          </div>
                        </div>
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Gráfico de conversas */}
                <Card>
                  <CardHeader>
                    <CardTitle>Conversas por Dia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={conversationData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="day" className="text-xs fill-muted-foreground" />
                        <YAxis className="text-xs fill-muted-foreground" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px'
                          }}
                        />
                        <Bar dataKey="resolved" fill="hsl(var(--primary))" name="Resolvidas" />
                        <Bar dataKey="pending" fill="hsl(var(--muted))" name="Pendentes" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conversations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tópicos Mais Frequentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topicsData.map((topic, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{topic.topic}</span>
                            <Badge variant="outline">{topic.count} conversas</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Progress value={topic.resolution} className="flex-1" />
                            <span className="text-sm text-muted-foreground">{topic.resolution}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="satisfaction" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição de Satisfação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={satisfactionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {satisfactionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Comentários Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Maria Silva</span>
                            <div className="flex text-yellow-400">★★★★★</div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            "Atendimento excelente, problema resolvido rapidamente!"
                          </p>
                        </div>
                        
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">João Santos</span>
                            <div className="flex text-yellow-400">★★★★☆</div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            "Bom atendimento, mas poderia ser mais rápido."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tempo de Resposta por Horário</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={responseTimeData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="hour" className="text-xs fill-muted-foreground" />
                        <YAxis className="text-xs fill-muted-foreground" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="avgTime" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
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