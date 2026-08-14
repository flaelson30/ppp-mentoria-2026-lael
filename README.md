# API REST - Gerenciamento de Dispositivos Móveis

Projeto exemplo para a mentoria: uma API REST em Node.js/Express para cadastrar e gerenciar dispositivos celulares.

Visão geral
- Autenticação via JWT.
- Usuários em memória: `admin` (senha: `adminpass`, papel: `admin`) e `seller` (senha: `sellerpass`, papel: `seller`).
- Vendedores (`seller`) apenas consultam dispositivos.
- Administradores (`admin`) realizam CRUD completo (criar, ler, atualizar, excluir).
- Dados de dispositivos armazenados em memória (array) durante a execução.
- Documentação da API disponível em `/docs` (Swagger UI), com o arquivo fonte em `resources/swagger.json`.

Estrutura do projeto
- `src/` - código fonte
	- `routes/` - definições de rotas
	- `controllers/` - lógica dos endpoints
	- `services/` - acesso aos dados (in-memory)
	- `models/` - modelos/validações simples
	- `middleware/` - autenticação e autorização
- `resources/swagger.json` - especificação OpenAPI (usada pelo Swagger UI)

Como rodar
1. Instale dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm start
```

O servidor padrão roda em `http://localhost:3000`.

Endpoints principais
- `POST /auth/login` - faz login e retorna `token` JWT. Exemplo de body: `{ "username": "admin", "password": "adminpass" }`.
- Removido: `POST /auth/register` público. A criação de usuários agora é feita apenas por administradores via:
	- `POST /users/admin` - cria administrador (admin apenas)
	- `POST /users/seller` - cria vendedor (admin apenas)
- `POST /users/admin` - cria um administrador (admin apenas). Body exemplo: `{ "username": "novoAdmin", "password": "senha" }`.
- `POST /users/seller` - cria um vendedor (admin apenas). Body exemplo: `{ "username": "novoVendedor", "password": "senha" }`.
- `GET /users` - lista usuários (apenas administradores).
- `GET /devices` - lista dispositivos (requer token no header `Authorization: Bearer <token>`).
- `GET /devices/{id}` - obtém dispositivo por id (requer token).
- `POST /devices` - cria dispositivo (requer token de `admin`).
- `PUT /devices/{id}` - atualiza dispositivo (requer token de `admin`).
- `DELETE /devices/{id}` - remove dispositivo (requer token de `admin`).

Swagger / Documentação
- O Swagger UI é servido em `/docs` e consome a especificação em `resources/swagger.json`.

Observações
- Este projeto usa armazenamento em memória e credenciais em texto plano apenas para fins didáticos. Em produção, use um banco de dados persistente e proteção de senhas.
