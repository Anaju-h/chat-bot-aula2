import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Send, User, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot" | "system";
  content: string;
  timestamp: Date;
  attachments?: string[];
  reactions?: string[];
}

interface ChatSession {
  id: string;
  userName: string;
  status: "online" | "typing" | "away";
  lastActive: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "Conversa iniciada em " + new Date().toLocaleString(),
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "bot",
      content: "Olá! Sou seu assistente virtual. Como posso ajudá-lo hoje?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeSession, setActiveSession] = useState<ChatSession>({
    id: "1",
    userName: "Maria Silva",
    status: "online",
    lastActive: new Date()
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "Como posso ajudar?",
    "Preciso de mais informações",
    "Vou transferir para um especialista",
    "Problema resolvido!"
  ];

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        "Entendi sua pergunta. Deixe-me ajudá-lo com isso.",
        "Posso ajudá-lo com informações sobre nossos produtos e serviços.",
        "Essa é uma ótima pergunta! Vou buscar as informações para você.",
        "Com base no que você perguntou, aqui estão algumas opções...",
        "Obrigado por entrar em contato. Vou verificar isso para você.",
        "Baseado na nossa base de conhecimento, posso sugerir...",
        "Vou consultar nossas políticas mais recentes sobre isso.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSendMessage = (content?: string) => {
    const messageContent = content || inputValue;
    if (!messageContent.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    simulateBotResponse(messageContent);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addReaction = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
        : msg
    ));
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{activeSession.userName}</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  activeSession.status === "online" ? "bg-green-500" :
                  activeSession.status === "typing" ? "bg-yellow-500" : "bg-gray-500"
                }`} />
                <span className="text-sm text-muted-foreground">
                  {activeSession.status === "online" ? "Online" :
                   activeSession.status === "typing" ? "Digitando..." : "Ausente"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === "system" ? (
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {message.content}
                    </Badge>
                  </div>
                ) : (
                  <div
                    className={`flex gap-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.type === "bot" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className="max-w-[70%] space-y-1">
                      <div
                        className={`rounded-lg px-3 py-2 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.attachments && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2 text-xs opacity-70">
                                <Paperclip className="h-3 w-3" />
                                <span>{attachment}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs opacity-70">
                        <span>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        
                        {message.reactions && message.reactions.length > 0 && (
                          <div className="flex space-x-1">
                            {message.reactions.map((reaction, index) => (
                              <span key={index} className="text-sm">{reaction}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {message.type === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        <div className="p-2 border-t">
          <div className="flex flex-wrap gap-2 mb-2">
            {quickReplies.map((reply, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm" 
                onClick={() => handleSendMessage(reply)}
                className="text-xs"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button variant="ghost" size="icon" className="shrink-0">
              <Smile className="h-4 w-4" />
            </Button>
            <Button onClick={() => handleSendMessage()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 border-l bg-card">
        <Tabs defaultValue="info" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="p-4 space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Informações do Usuário</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Nome: {activeSession.userName}</p>
                <p>Status: Online</p>
                <p>Sessão iniciada: {activeSession.lastActive.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Tags</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">VIP</Badge>
                <Badge variant="outline">Recorrente</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Ações Rápidas</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Transferir para Humano
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Encerrar Conversa
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Adicionar Nota
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="p-4">
            <div className="space-y-2">
              <h4 className="font-medium">Conversas Anteriores</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 border rounded">
                  <p className="font-medium">Cancelamento de pedido</p>
                  <p className="text-muted-foreground">Há 2 dias</p>
                </div>
                <div className="p-2 border rounded">
                  <p className="font-medium">Informações de entrega</p>
                  <p className="text-muted-foreground">Há 1 semana</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}