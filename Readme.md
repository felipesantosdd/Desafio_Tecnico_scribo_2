# API de Autenticação de Usuários

Esta é uma API RESTful desenvolvida para autenticação de usuários, permitindo operações de cadastro, autenticação e recuperação de informações do usuário.

## Como Executar

1. **Instalação:**
   Certifique-se de ter o [Node.js](https://nodejs.org/) instalado e o Docker em seu sistema.

2. **Clone o Repositório:**

   ```bash
   git clone https://github.com/felipesantosdd/Desafio_Tecnico_scribo_2.git
   cd Desafio_Tecnico_scribo_2
   ```

3. **Execução:**
   Inicie o container PostgreSQL com o comando:
   O arquivo .env, esta configurado com as variaveis de ambiente para o container docker

   ```bash
   docker-compose up
   ```

   Em seguida, execute as migrações:

   ```bash
   npm run typeorm migration:run -- -d src/data-source
   ```

   Por fim, inicie a aplicação com o comando:

   ```bash
   npm run dev
   ```

## Endpoints

### 1. users/signup (Criação de Cadastro)

não é possivel ter dois usuarios com o mesmo email.

#### Input:

```json
{
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

#### Output (sucesso):

```json
{
  "mensagem": "Cadastro realizado com sucesso"
}
```

### 2. users/signin (Autenticação)

#### Input:

```json
{
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

### 3. users/profile (Buscar Usuário)

Os usuários logados terão acesso apenas ao seu perfil. Não é necessário passar o ID, apenas o token recebido no login ou na criação do cadastro.
