import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mockConversations = [
  {
    id: "1",
    user: "João Silva",
    phone: "+55 11 99999-9999",
    lastMessage: "Como posso cancelar meu pedido?",
    timestamp: "2 min atrás",
    status: "resolved",
  },
  {
    id: "2",
    user: "Maria Santos",
    phone: "+55 11 88888-8888",
    lastMessage: "Quais são os horários de funcionamento?",
    timestamp: "5 min atrás",
    status: "active",
  },
  {
    id: "3",
    user: "Pedro Costa",
    phone: "+55 11 77777-7777",
    lastMessage: "Preciso de ajuda com minha conta",
    timestamp: "10 min atrás",
    status: "pending",
  },
];

const statusVariants = {
  resolved: "default",
  active: "secondary",
  pending: "destructive",
} as const;

const statusLabels = {
  resolved: "Resolvido",
  active: "Ativo",
  pending: "Pendente",
};

export function RecentConversations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversas Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockConversations.map((conversation) => (
            <div key={conversation.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {conversation.user.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none">
                  {conversation.user}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={statusVariants[conversation.status]}>
                  {statusLabels[conversation.status]}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {conversation.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}