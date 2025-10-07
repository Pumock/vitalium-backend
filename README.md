<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app
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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
