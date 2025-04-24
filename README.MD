
# Gestão de Tarefas

Projeto fullstack para gerenciamento de tarefas com backend em Node.js, frontend com AngularJS, banco de dados PostgreSQL e documentação via Swagger.

---

## Tecnologias utilizadas

- **Frontend:** HTML5, CSS3, Bootstrap, AngularJS  
- **Backend:** Node.js, Express  
- **Banco de Dados:** PostgreSQL (hospedado na [Neon.tech](https://neon.tech))  
- **Documentação:** Swagger UI  
- **Segurança:** Express Rate Limit  

---

## Como rodar o projeto

### Clone o repositório

bash
git clone https://github.com/seuusuario/gestao-tarefas.git
cd gestao-tarefas

### Instale os pacotes

bash

npm install swagger-ui-express swagger-jsdoc
npm install express-rate-limit
npm install


### Configure seu banco de dados

Crie um arquivo `.env` com os dados da sua conexão com o PostgreSQL.

---

### Execute o servidor

```bash
node server.js
```

---

## Acesse a aplicação

- Página principal: [http://localhost:3000/](http://localhost:3000/)
- Documentação da API (Swagger): [http://localhost:3000/api-docs/#/](http://localhost:3000/api-docs/#/)

---

## Endpoints da API

| Método | Rota             | Descrição                 |
|--------|------------------|---------------------------|
| GET    | `/api/tasks`     | Lista todas as tarefas    |
| POST   | `/api/tasks`     | Cria uma nova tarefa      |
| PUT    | `/api/tasks/:id` | Atualiza uma tarefa       |
| DELETE | `/api/tasks/:id` | Deleta uma tarefa         |

---

## Segurança

- **Rate Limiting** configurado para limitar 100 requisições por IP a cada 15 minutos com `express-rate-limit`.

---

## Autor

Feito por **João Henrique da Rosa Rodrigues**

---
