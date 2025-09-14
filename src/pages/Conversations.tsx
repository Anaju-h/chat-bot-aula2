import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Search, Filter, MoreHorizontal, User, Bot, Clock, CheckCircle } from "lucide-react";

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  status: "ativo" | "resolvido" | "pendente";
  topic: string;
  lastMessage: string;
  messageCount: number;
  startTime: Date;
  endTime?: Date;
  satisfaction?: number;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Maria Silva",
    status: "resolvido",
    topic: "Cancelamento de pedido",
    lastMessage: "Obrigada pela ajuda! Problema resolvido.",
    messageCount: 12,
    startTime: new Date(2024, 0, 15, 14, 30),
    endTime: new Date(2024, 0, 15, 14, 45),
    satisfaction: 5
  },
  {
    id: "2",
    userId: "user2",
    userName: "João Santos",
    status: "ativo",
    topic: "Informações de produto",
    lastMessage: "Qual é o prazo de entrega para minha região?",
    messageCount: 8,
    startTime: new Date(2024, 0, 15, 15, 20),
  },
  {
    id: "3",
    userId: "user3",
    userName: "Ana Costa",
    status: "pendente",
    topic: "Problemas técnicos",
    lastMessage: "O site não está carregando corretamente",
    messageCount: 5,
    startTime: new Date(2024, 0, 15, 13, 10),
    satisfaction: 3
  },
  {
    id: "4",
    userId: "user4",
    userName: "Carlos Oliveira",
    status: "resolvido",
    topic: "Devolução",
    lastMessage: "Processo de devolução iniciado com sucesso.",
    messageCount: 15,
    startTime: new Date(2024, 0, 15, 10, 45),
    endTime: new Date(2024, 0, 15, 11, 20),
    satisfaction: 4
  }
];

export default function Conversations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || conv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ativo": return "default";
      case "resolvido": return "secondary";
      case "pendente": return "destructive";
      default: return "outline";
    }
  };

  const formatDuration = (start: Date, end?: Date) => {
    const endTime = end || new Date();
    const diffMs = endTime.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    return `${diffMins}min`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-muted-foreground"}>★</span>
    ));
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b bg-background">
            <div className="container flex h-14 items-center px-4">
              <SidebarTrigger className="mr-4" />
              <h1 className="font-semibold">Conversas</h1>
            </div>
          </div>
          
          <div className="container space-y-6 p-6">
            {/* Filtros e Busca */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas por usuário ou tópico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-auto">
                <TabsList>
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="ativo">Ativos</TabsTrigger>
                  <TabsTrigger value="pendente">Pendentes</TabsTrigger>
                  <TabsTrigger value="resolvido">Resolvidos</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Lista de Conversas */}
            <div className="grid gap-4">
              {filteredConversations.map((conversation) => (
                <Card key={conversation.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar>
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{conversation.userName}</h3>
                              <Badge variant={getStatusVariant(conversation.status)}>
                                {conversation.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{formatDuration(conversation.startTime, conversation.endTime)}</span>
                              <MessageSquare className="h-3 w-3 ml-2" />
                              <span>{conversation.messageCount} mensagens</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-primary">{conversation.topic}</p>
                            <p className="text-sm text-muted-foreground">{conversation.lastMessage}</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <span>Iniciado em {conversation.startTime.toLocaleString()}</span>
                              {conversation.endTime && (
                                <>
                                  <span>•</span>
                                  <CheckCircle className="h-3 w-3" />
                                  <span>Finalizado</span>
                                </>
                              )}
                            </div>
                            {conversation.satisfaction && (
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-muted-foreground">Satisfação:</span>
                                <div className="flex text-xs">
                                  {renderStars(conversation.satisfaction)}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredConversations.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma conversa encontrada</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "todos" 
                      ? "Tente ajustar os filtros de busca." 
                      : "Ainda não há conversas registradas."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}