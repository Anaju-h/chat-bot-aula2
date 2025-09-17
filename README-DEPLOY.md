# Deploy para Google Cloud Platform

Este guia explica como fazer o deploy da aplicação ChatBot RAG no Google Cloud Platform.

## Pré-requisitos

1. **Google Cloud SDK instalado**
   ```bash
   # Instalar gcloud CLI
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   ```

2. **Projeto no Google Cloud Platform**
   - Crie um projeto no [Google Cloud Console](https://console.cloud.google.com)
   - Ative o App Engine API
   - Configure a cobrança (necessário para o App Engine)

3. **Autenticação**
   ```bash
   gcloud auth login
   gcloud config set project SEU-PROJECT-ID
   ```

## Métodos de Deploy

### Método 1: Deploy Manual

1. **Build da aplicação**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy para App Engine**
   ```bash
   gcloud app deploy
   ```

3. **Abrir aplicação**
   ```bash
   gcloud app browse
   ```

### Método 2: Deploy Automatizado com Cloud Build

1. **Conectar repositório ao Cloud Build**
   - Vá para Cloud Build no console
   - Conecte seu repositório GitHub/GitLab
   - Configure o trigger para usar o arquivo `cloudbuild.yaml`

2. **Deploy automático**
   - Cada push para a branch principal fará deploy automaticamente

## Configurações Importantes

### Variáveis de Ambiente
As credenciais do Supabase já estão configuradas no código. Para produção, considere usar:
- Google Secret Manager para chaves sensíveis
- Cloud SQL se quiser migrar do Supabase

### Domínio Personalizado
1. No App Engine, vá para "Settings" > "Custom domains"
2. Adicione seu domínio
3. Configure os registros DNS conforme instruído

### SSL/HTTPS
- O App Engine automaticamente fornece SSL
- Certificados são renovados automaticamente

## Comandos Úteis

```bash
# Ver logs da aplicação
gcloud app logs tail -s default

# Ver versões deployadas
gcloud app versions list

# Definir tráfego para versão específica
gcloud app services set-traffic default --splits v1=100

# Deletar versão antiga
gcloud app versions delete VERSION_ID
```

## Estrutura de Arquivos para Deploy

```
projeto/
├── dist/              # Arquivos buildados (gerados pelo npm run build)
├── app.yaml          # Configuração do App Engine
├── .gcloudignore     # Arquivos ignorados no upload
├── cloudbuild.yaml   # Configuração do Cloud Build
└── README-DEPLOY.md  # Este arquivo
```

## Custos Esperados

- **App Engine F1**: ~$0.05/hora quando ativo
- **Tráfego**: Primeiros 1GB grátis por dia
- **Armazenamento**: Primeiros 5GB grátis

## Troubleshooting

### Erro: "No module found"
- Certifique-se que `npm run build` foi executado
- Verifique se o diretório `dist` existe

### Erro de permissões
```bash
gcloud auth application-default login
```

### App não carrega
- Verifique os logs: `gcloud app logs tail`
- Confirme que o build foi bem-sucedido

## Monitoramento

- **Cloud Monitoring**: Métricas automáticas
- **Error Reporting**: Erros JavaScript capturados automaticamente
- **Cloud Logging**: Logs centralizados

## Backup

O Supabase já gerencia backups do banco de dados. Para backups da aplicação:
- Use Cloud Source Repositories
- Configure snapshots regulares se usar Cloud SQL

---

**Dica**: Para desenvolvimento, use `npm run dev`. Para produção, sempre use `npm run build` antes do deploy.