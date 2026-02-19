# Vitalium Backend

API backend desenvolvida com NestJS, Prisma e PostgreSQL.

---

## Requisitos

- Docker Desktop instalado

---

## Desenvolvimento

### Primeira execução

```bash
npm run dev:build
```

Esse comando realiza o build das imagens e sobe todo o ambiente.

### Próximas execuções

```bash
npm run dev
```

### Parar ambiente

```bash
npm run dev:stop
```

### Ver logs

```bash
npm run dev:logs
```

---

## Rodar Sem Docker (Recomendado para desenvolvimento local)

Esse fluxo sobe apenas o banco via Docker e roda a aplicação localmente,
com hot-reload mais rápido e debug facilitado.

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar ambiente local

```bash
cp .env.example .env.development
```

Preencha as variáveis obrigatórias antes de iniciar.

### 3. Subir apenas o banco

```bash
npm run infra
```

### 4. Rodar as migrations

```bash
npm run migrate
```

### 5. Rodar a aplicação

```bash
npm run start:dev
```

### Parar o banco

```bash
npm run infra:stop
```

---

## Produção

### Build e iniciar

```bash
npm run prod:build
```

### Parar produção

```bash
npm run prod:stop
```

---

## Ambientes

O projeto suporta os seguintes ambientes:

- `.env.development`
- `.env.staging`
- `.env.production`

Criar ambiente local:

```bash
cp .env.example .env.development
```

Preencha as variáveis obrigatórias antes de iniciar a aplicação.

---

## URLs em Desenvolvimento

- API: http://localhost:3000  
- Swagger: http://localhost:3000/api/docs  
- Health Check: http://localhost:3000/health  
- Prisma Studio: http://localhost:5555  

---

## Testes

```bash
npm run test
npm run test:watch
npm run test:cov
```

---

## Lint e Formatação

```bash
npm run lint
npm run format
```

---

## Estrutura do Projeto

```
src/
docker-compose.yml
docker-compose.dev.yml
.env.*
```

---

## Stack

- NestJS
- Prisma ORM
- PostgreSQL
- Docker
- JWT
- Rate Limiting
- Health Monitoring
- Metrics

---

## Observações

- Não versionar arquivos `.env`
- Não expor porta do banco em produção
- Utilizar sempre o ambiente correto (.env correspondente)