# 🚀 Vitalium Backend - Guia de Desenvolvimento

## ⚡ **INÍCIO RÁPIDO - UM COMANDO SÓ**

```bash
npm run docker:setup-dev
```

**Esse comando faz TUDO:** Backend + Banco + Interface do Banco
**Depois acesse:** http://localhost:3000

---

## 🐳 Docker - Ambiente de Desenvolvimento

### 🚀 **Comando Principal - Rodar TUDO no Docker**

```bash
npm run docker:setup-dev
```

**Este é o ÚNICO comando que você precisa!** Ele faz tudo:

- ✅ Constrói todas as imagens (Backend, PostgreSQL, Prisma Studio)
- ✅ Inicia todos os containers automaticamente
- ✅ Configura o banco de dados
- ✅ Ativa hot-reload para desenvolvimento
- ✅ Deixa tudo pronto para usar

### 🌐 **Serviços Disponíveis Após o Setup**

| Serviço              | URL                   | Descrição          |
| -------------------- | --------------------- | ------------------ |
| 🚀 **Backend API**   | http://localhost:3000 | Sua API principal  |
| 🎨 **Prisma Studio** | http://localhost:5555 | Interface do banco |
| 🗄️ **PostgreSQL**    | localhost:5432        | Banco de dados     |

### 📊 **Comandos de Desenvolvimento**

```bash
# ▶️  Iniciar (primeira vez ou rebuild completo)
npm run docker:setup-dev

# 🚀 Iniciar containers já buildados (mais rápido)
npm run docker:start

# ⏹️  Parar todos os containers
npm run docker:stop

# 📋 Ver logs em tempo real
npm run docker:dev:logs
```

### 🐳 Docker - Comandos Avançados

```bash
# 🔧 Reconstruir tudo (se algo der errado)
npm run docker:dev:build

# � Iniciar containers já buildados
npm run docker:start

# �🔄 Reiniciar apenas o backend
docker-compose -f docker-compose.dev.yml restart vitalium-backend-dev

# 📊 Ver logs específicos
docker-compose -f docker-compose.dev.yml logs -f vitalium-backend-dev
```

### Utilitários

```bash
# Verificar saúde da aplicação
npm run health

# Executar apenas o setup (sem iniciar dev)
npm run setup
```

## 📋 Pré-requisitos

- **Docker Desktop**: https://www.docker.com/products/docker-desktop/

## 🌐 Serviços Disponíveis

Após executar `npm run docker:setup-dev`:

| Serviço              | URL                            | Descrição                 |
| -------------------- | ------------------------------ | ------------------------- |
| 🚀 **API Principal** | http://localhost:3000          | Sua API NestJS            |
| 📚 **Swagger Docs**  | http://localhost:3000/api/docs | Documentação interativa   |
| ❤️ **Health Check**  | http://localhost:3000/health   | Status do sistema         |
| 🗄️ **PostgreSQL**    | localhost:5432                 | Banco de dados            |
| 🎨 **Prisma Studio** | http://localhost:5555          | Interface visual do banco |

## 🔧 Fluxo de Desenvolvimento

```bash
# 1. Setup inicial (primeira vez)
npm run docker:setup-dev

# 2. Desenvolvimento diário (containers já buildados)
npm run docker:start

# 3. Visualizar dados do banco
# Abra http://localhost:5555

# 4. Executar testes
npm run test:watch

# 5. Parar containers quando terminar
npm run docker:stop
```

## 🚨 Solução de Problemas

### Docker não responde

```bash
npm run docker:stop
npm run docker:setup-dev
```

### Erro no Prisma ou Banco

```bash
npm run docker:stop
npm run docker:dev:build
npm run docker:start
```

### Reset completo

```bash
npm run docker:stop
docker system prune -f
npm run docker:setup-dev
```
