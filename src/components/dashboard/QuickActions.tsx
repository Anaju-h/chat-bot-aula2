import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, MessageSquare, Settings } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Plus className="h-5 w-5" />
            <span className="text-xs">Novo Documento</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Upload className="h-5 w-5" />
            <span className="text-xs">Upload Arquivo</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Nova Conversa</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Settings className="h-5 w-5" />
            <span className="text-xs">Configurar Bot</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}