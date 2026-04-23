# APIRESTPOLI 🚀

Este projeto consiste em uma API REST em JavaScript utilizando **Node.js, Express e Mongoose**, construída com foco explícito na aplicação de **polimorfismo por meio de interfaces simuladas (classes base)** e **injeção dinâmica de implementações via configuração**.

---

## 📚 Objetivo

Demonstrar na prática como aplicar **polimorfismo em JavaScript (sem tipagem forte)** utilizando:

* Classes base como contratos (interfaces simuladas)
* Herança com sobrescrita de métodos
* Troca dinâmica de implementações via `config.js`

---

## 🧠 Estratégia Polimórfica do Projeto

O projeto implementa polimorfismo em **três camadas principais**:

### 1. Controllers

Arquivo base:

* `IUserController.js`

Define os métodos:

```javascript
index()
show()
store()
destroy()
update()
search()
```

Implementações:

* `UserController.js`
* `UserControllerEncap.js`

Ambos **herdam de `IUserController` e sobrescrevem os métodos**, mudando o comportamento sem alterar quem consome.

---

### 2. DAO (Data Access Object)

Arquivo base:

* `IUserDAO.js`

Define os métodos:

```javascript
create()
recovery()
update()
delete()
search()
```

Implementações:

* `UserDAO_Mongoose.js`
* `UserDAO_Encap_Mongoose.js`

Cada uma implementa a persistência de forma diferente:

* Uma trabalha diretamente com `req.body`
* Outra trabalha com objeto encapsulado (`toJSON()`)

---

### 3. Rotas

Arquivo base:

* `IRoutes.js`

Define os métodos:

```javascript
get()
post()
listen()
```

Implementação:

* `UserRoutes.js`

Responsável por configurar o Express e mapear endpoints.

---

## 🔄 Polimorfismo via Configuração

O ponto mais importante do projeto está no uso do arquivo:

```javascript
config.js
```

Ele define qual implementação será usada:

```javascript
let IRoutes = require('./routes/'+config.IRoutes);
let UserController = require('../controllers/'+config.IUserController);
let UserDAO = require('../persistencelayer/dao/'+config.IUserDAO);
```

👉 Isso permite trocar completamente o comportamento da aplicação **sem alterar o código principal**.

---

## 🏗️ Fluxo da Aplicação

### index.js

```javascript
let IRoutes = require('./routes/'+config.IRoutes);
let userRoutes = new IRoutes();

userRoutes.get();
userRoutes.post();
userRoutes.listen();
```

A aplicação inicializa dinamicamente a implementação de rotas.

---

### Rotas (UserRoutes)

Endpoints principais:

```javascript
GET  /           -> mensagem inicial
GET  /user       -> listar usuários
GET  /user/search -> busca
POST /user       -> criar usuário
```

---

### Controller

Exemplo real (`UserController.js`):

```javascript
async show(req, res) {
  let users = await userdao.recovery();
  return res.json(users);
}
```

O controller delega completamente ao DAO.

---

### DAO com Mongoose

```javascript
async recovery(){ 
  let users = await User.find();
  return users; 
}
```

A persistência é feita com MongoDB via Mongoose.

---

### DAO com Encapsulamento

```javascript
async create(objuser){
  const user = await User.create(objuser.toJSON());
  return user;
}
```

Aqui há uma variação polimórfica no formato de entrada.

---

## 🧩 Diferença entre as Implementações

| Camada     | Implementação          | Estratégia                      |
| ---------- | ---------------------- | ------------------------------- |
| Controller | UserController         | Uso direto de `req`             |
| Controller | UserControllerEncap    | Uso de objeto `User`            |
| DAO        | UserDAO_Mongoose       | Persistência direta             |
| DAO        | UserDAO_Encap_Mongoose | Persistência com encapsulamento |

---

## ⚙️ Tecnologias Utilizadas

* Node.js
* Express
* Mongoose
* MongoDB Atlas
* Body-parser
* CORS

---

## ▶️ Execução

```bash
git clone https://github.com/engsoftifb/APIRESTPOLI.git
cd APIRESTPOLI
npm install
npm start
```

Servidor:

```bash
http://localhost:3000
```

---

## 🎯 Conclusão

Este projeto demonstra claramente uma arquitetura baseada em:

* Interfaces simuladas com classes base
* Herança e sobrescrita
* Inversão de dependência via configuração

👉 O principal ganho é a capacidade de trocar comportamentos (Controller, DAO, Rotas) **sem modificar o código cliente**, caracterizando uma aplicação prática de **polimorfismo em JavaScript**.

---

## 👨‍💻 Contexto

Projeto educacional voltado ao ensino de:

* Programação Orientada a Objetos em JavaScript
* Arquitetura em camadas
* Padrões de projeto (DAO + Controller + Routes)
* Polimorfismo aplicado em APIs REST
