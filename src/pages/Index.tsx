import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentConversations } from "@/components/dashboard/RecentConversations";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { TopTopics } from "@/components/dashboard/TopTopics";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ChatBot } from "@/components/chat/ChatBot";
import { MessageSquare, Users, FileText, TrendingUp, Clock, CheckCircle, AlertTriangle, Brain } from "lucide-react";

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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
              <StatsCard
                title="Total de Conversas"
                value="2,847"
                description="Conversas este mês"
                icon={MessageSquare}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Usuários Ativos"
                value="1,256"
                description="Usuários únicos"
                icon={Users}
                trend={{ value: 8, isPositive: true }}
              />
              <StatsCard
                title="Documentos"
                value="156"
                description="Na base de conhecimento"
                icon={FileText}
                trend={{ value: 15, isPositive: true }}
              />
              <StatsCard
                title="Taxa de Sucesso"
                value="96.8%"
                description="Respostas satisfatórias"
                icon={TrendingUp}
                trend={{ value: 3, isPositive: true }}
              />
              <StatsCard
                title="Tempo Médio"
                value="1.2min"
                description="Resposta do bot"
                icon={Clock}
                trend={{ value: 5, isPositive: false }}
              />
              <StatsCard
                title="Resolvidas"
                value="2,684"
                description="Conversas resolvidas"
                icon={CheckCircle}
                trend={{ value: 18, isPositive: true }}
              />
            </div>
            
            {/* Activity Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <ActivityChart />
                <RecentConversations />
              </div>
              <div className="space-y-6">
                <TopTopics />
                <QuickActions />
              </div>
            </div>
            
            {/* ChatBot Section */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ChatBot />
              </div>
              <div className="space-y-4">
                <StatsCard
                  title="IA Performance"
                  value="98.5%"
                  description="Precisão das respostas"
                  icon={Brain}
                  trend={{ value: 1.2, isPositive: true }}
                />
                <StatsCard
                  title="Pendentes"
                  value="23"
                  description="Aguardando análise"
                  icon={AlertTriangle}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
