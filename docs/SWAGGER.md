# 📚 Documentação Swagger - Vitalium Backend

## 🚀 Configuração do Swagger

Este projeto utiliza o Swagger/OpenAPI para documentação automática da API.

### 📁 Estrutura dos Arquivos Swagger

```
src/shared/swagger/
├── swagger.config.ts          # Configuração principal do Swagger
└── decorators/
    ├── index.ts              # Exportações dos decorators
    └── user.decorators.ts    # Decorators específicos para usuários
```

### 🔧 Como Usar

1. **Acesso à Documentação**:
   - URL: `http://localhost:3000/api/docs`
   - A documentação é gerada automaticamente com base nos decorators

2. **Estrutura da Documentação**:
   - ✅ **Informações da API**: Título, descrição, versão
   - ✅ **Tags organizadas**: users, patients, doctors, hospitals, appointments
   - ✅ **Autenticação JWT**: Configurada com Bearer Token
   - ✅ **Exemplos de request/response**: Dados realísticos
   - ✅ **Validações**: Documentadas com base nos DTOs

### 📝 Decorators Criados

#### Para Controllers:

- `@ApiUserOperations.createUser()` - Documentar criação de usuário
- `@ApiUserOperations.findAllUsers()` - Documentar listagem de usuários
- `@ApiUserOperations.findUserById()` - Documentar busca por ID
- `@ApiUserOperations.findUserByEmail()` - Documentar busca por email
- `@ApiUserOperations.updateUser()` - Documentar atualização
- `@ApiUserOperations.deleteUser()` - Documentar exclusão

#### Para DTOs:

- `@ApiProperty()` - Propriedades obrigatórias
- `@ApiPropertyOptional()` - Propriedades opcionais
- Inclui exemplos, descrições, validações e tipos

### 🎨 Customizações

A documentação inclui:

- **CSS customizado** para melhor aparência
- **Persistência de autenticação** entre sessões
- **Servidores múltiplos** (desenvolvimento e produção)
- **Contato e licença** da equipe
- **Expansão de documentação** configurada

### 📊 Exemplo de Response

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "joao@exemplo.com",
  "firstName": "João",
  "lastName": "Silva",
  "phone": "+55 11 99999-9999",
  "avatar": "https://exemplo.com/avatar.jpg",
  "role": "PATIENT",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 🔐 Autenticação

Para testar endpoints protegidos:

1. Clique no botão "Authorize" 🔒
2. Digite: `Bearer YOUR_JWT_TOKEN`
3. Clique em "Authorize"

### 🚀 Próximos Passos

1. **Instalar dependência**: `npm install @nestjs/swagger swagger-ui-express`
2. **Adicionar decorators** aos demais controllers (patients, doctors, etc.)
3. **Expandir documentação** com mais exemplos e casos de uso
4. **Configurar ambientes** de desenvolvimento e produção

### 📖 Referências

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Options](https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/)
