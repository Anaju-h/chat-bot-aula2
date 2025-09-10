import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentConversations } from "@/components/dashboard/RecentConversations";
import { MessageSquare, Users, FileText, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b bg-background">
            <div className="container flex h-14 items-center px-4">
              <SidebarTrigger className="mr-4" />
              <h1 className="font-semibold">Dashboard</h1>
            </div>
          </div>
          
          <div className="container space-y-6 p-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total de Conversas"
                value="1,234"
                description="Conversas este mês"
                icon={MessageSquare}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Usuários Ativos"
                value="567"
                description="Usuários únicos"
                icon={Users}
                trend={{ value: 8, isPositive: true }}
              />
              <StatsCard
                title="Documentos"
                value="89"
                description="Na base de conhecimento"
                icon={FileText}
              />
              <StatsCard
                title="Taxa de Sucesso"
                value="94%"
                description="Respostas satisfatórias"
                icon={TrendingUp}
                trend={{ value: 2, isPositive: true }}
              />
            </div>
            
            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
              <RecentConversations />
              <div className="grid gap-4">
                {/* Placeholder for future charts/components */}
                <div className="h-64 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                  <p className="text-muted-foreground">Gráfico de atividade em breve</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
