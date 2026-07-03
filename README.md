# MusicHorizon API

API REST do projeto MusicHorizon — Engenharia de Software II.

## Como Executar

```bash
npm install
npm start
```

Acesse: http://localhost:3000

Requisitos: Node.js >= 16

 [ **Deploy no StackBlitz:**_](https://stackblitz.com/~/github.com/igorsousa-santos/projeto-eng-soft2)

## Componentes do Grupo

Guilherme da Silva Pereira

Igor Sousa Santos


## Rotas Implementadas

### Usuario (/usuario)

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| POST | /usuario | Cria um novo usuario |
| GET | /usuario | Lista todos os usuarios |
| GET | /usuario/lastfm/:username | Busca usuario pelo username do Last.fm |
| GET | /usuario/:id | Retorna um usuario pelo ID |
| PUT | /usuario/:id | Atualiza dados de um usuario |
| DELETE | /usuario/:id | Remove um usuario |
| POST | /usuario/:id/vincular-spotify | Vincula conta do Spotify (requer token) |

### Conquista (/conquista)

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | /conquista/usuario/:id | Retorna conquistas desbloqueadas do usuario |

### Playlist (/playlist)

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| POST | /playlist/gerar | Gera playlist via Spotify (requer token) |
| GET | /playlist/usuario/:id | Lista playlists de um usuario |
| GET | /playlist/:id | Retorna uma playlist pelo ID |
| PUT | /playlist/:id | Atualiza nome de uma playlist |
| DELETE | /playlist/:id | Remove uma playlist |
| POST | /playlist/:id/exportar | Exporta playlist para o Spotify (requer token) |

### Recomendacao (/recomendacao)

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | /recomendacao/usuario/:id | Obtem recomendacoes de musicas (requer token) |

## Telas da Aplicacao

A aplicacao possui 4 telas com navegacao entre elas:

**1. Login / Cadastro** (index.html)
- Lista usuarios existentes para selecionar
- Formulario de cadastro de novo usuario
- Rotas: GET /usuario, POST /usuario

**2. Dashboard** (dashboard.html)
- Exibe dados do usuario logado
- Editar perfil e excluir conta
- Buscar usuario por Last.fm username
- Rotas: GET /usuario/:id, PUT /usuario/:id, DELETE /usuario/:id, GET /usuario/lastfm/:username

**3. Conquistas** (conquistas.html)
- Lista as conquistas desbloqueadas do usuario logado
- Rota: GET /conquista/usuario/:id

**4. Playlists** (playlists.html)
- Lista playlists do usuario, ver detalhes, editar e deletar
- Rotas: GET /playlist/usuario/:id, GET /playlist/:id, PUT /playlist/:id, DELETE /playlist/:id

## Dados de Demonstracao

A aplicacao vem com dados pre-carregados:

- 2 usuarios: alice_music (ID 1) e bob_beats (ID 2)
- 10 conquistas cadastradas
- 3 conquistas desbloqueadas pelo usuario 1
- 2 playlists com musicas associadas

Use o usuario alice_music (ID 1) para ver conquistas e playlists com dados.
