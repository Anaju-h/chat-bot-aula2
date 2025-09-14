import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Search, 
  Plus, 
  Upload, 
  Edit, 
  Trash2, 
  Tag,
  Clock,
  Eye,
  Download
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: "manual" | "faq" | "policy" | "guide";
  createdAt: Date;
  updatedAt: Date;
  views: number;
  status: "published" | "draft" | "archived";
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Política de Cancelamento",
    content: "Nossa política permite cancelamentos até 24h antes...",
    tags: ["política", "cancelamento", "regras"],
    type: "policy",
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(2024, 0, 12),
    views: 245,
    status: "published"
  },
  {
    id: "2",
    title: "FAQ - Problemas de Login",
    content: "Perguntas frequentes sobre problemas de acesso...",
    tags: ["faq", "login", "suporte"],
    type: "faq",
    createdAt: new Date(2024, 0, 8),
    updatedAt: new Date(2024, 0, 15),
    views: 189,
    status: "published"
  },
  {
    id: "3",
    title: "Guia de Integração API",
    content: "Documentação completa da API para desenvolvedores...",
    tags: ["api", "desenvolvimento", "integração"],
    type: "guide",
    createdAt: new Date(2024, 0, 5),
    updatedAt: new Date(2024, 0, 14),
    views: 98,
    status: "draft"
  }
];

export default function Knowledge() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: "",
    content: "",
    tags: "",
    type: "manual"
  });

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "manual": return "default";
      case "faq": return "secondary";
      case "policy": return "destructive";
      case "guide": return "outline";
      default: return "outline";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "draft": return "secondary";
      case "archived": return "outline";
      default: return "outline";
    }
  };

  const handleCreateDocument = () => {
    const document: Document = {
      id: (documents.length + 1).toString(),
      title: newDocument.title,
      content: newDocument.content,
      tags: newDocument.tags.split(",").map(tag => tag.trim()),
      type: newDocument.type as any,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      status: "draft"
    };

    setDocuments([document, ...documents]);
    setNewDocument({ title: "", content: "", tags: "", type: "manual" });
    setIsDialogOpen(false);
    
    toast({
      title: "Documento criado",
      description: "O documento foi adicionado à base de conhecimento.",
    });
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Documento removido",
      description: "O documento foi removido da base de conhecimento.",
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
              <h1 className="font-semibold">Base de Conhecimento</h1>
            </div>
          </div>
          
          <div className="container space-y-6 p-6">
            {/* Controles superiores */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Documento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Criar Novo Documento</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={newDocument.title}
                          onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="content">Conteúdo</Label>
                        <Textarea
                          id="content"
                          className="min-h-[200px]"
                          value={newDocument.content}
                          onChange={(e) => setNewDocument({...newDocument, content: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                          <Input
                            id="tags"
                            value={newDocument.tags}
                            onChange={(e) => setNewDocument({...newDocument, tags: e.target.value})}
                            placeholder="tag1, tag2, tag3"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="type">Tipo</Label>
                          <select
                            id="type"
                            value={newDocument.type}
                            onChange={(e) => setNewDocument({...newDocument, type: e.target.value})}
                            className="w-full h-10 px-3 py-2 border rounded-md"
                          >
                            <option value="manual">Manual</option>
                            <option value="faq">FAQ</option>
                            <option value="policy">Política</option>
                            <option value="guide">Guia</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateDocument}>
                          Criar Documento
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>

            {/* Filtros por tipo */}
            <Tabs value={selectedType} onValueChange={setSelectedType}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="manual">Manuais</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="policy">Políticas</TabsTrigger>
                <TabsTrigger value="guide">Guias</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Lista de documentos */}
            <div className="grid gap-4">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-lg">{document.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getTypeVariant(document.type)}>
                              {document.type}
                            </Badge>
                            <Badge variant={getStatusVariant(document.status)}>
                              {document.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {document.content}
                        </p>
                        
                        <div className="flex items-center flex-wrap gap-2">
                          {document.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>Atualizado em {document.updatedAt.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{document.views} visualizações</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeleteDocument(document.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Nenhum documento encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm 
                      ? "Tente ajustar os termos de busca." 
                      : "Comece criando seu primeiro documento na base de conhecimento."}
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Documento
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}