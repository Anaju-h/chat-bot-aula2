import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const mockTopics = [
  { topic: "Cancelamento de pedidos", count: 145, percentage: 85 },
  { topic: "Informações de produtos", count: 98, percentage: 57 },
  { topic: "Problemas de entrega", count: 76, percentage: 44 },
  { topic: "Suporte técnico", count: 54, percentage: 32 },
  { topic: "Políticas de devolução", count: 43, percentage: 25 },
];

export function TopTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tópicos Mais Frequentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTopics.map((topic, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{topic.topic}</span>
                <span className="text-muted-foreground">{topic.count}</span>
              </div>
              <Progress value={topic.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}