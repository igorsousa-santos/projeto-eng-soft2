-- =============================================================
-- MusicHorizon – Schema SQL (PostgreSQL)
-- Execute: psql -d musichorizon -f database/schema.sql
-- =============================================================

-- Extensão para UUID (opcional, usamos SERIAL por padrão)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------
-- Tabela: usuarios
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id              SERIAL PRIMARY KEY,
    login_usuario   VARCHAR(100) NOT NULL,
    pontos          INTEGER      NOT NULL DEFAULT 0,
    lastfm_username VARCHAR(100),
    data_cadastro   TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- -------------------------------------------------------------
-- Tabela: conquistas (catálogo de conquistas disponíveis)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS conquistas (
    id                SERIAL PRIMARY KEY,
    nome              VARCHAR(150) NOT NULL,
    descricao         TEXT,
    meta_quantidade   INTEGER      NOT NULL DEFAULT 1,
    pontos_recompensa INTEGER      NOT NULL DEFAULT 0
);

-- -------------------------------------------------------------
-- Tabela: usuario_conquista (N:N – quais conquistas cada user desbloqueou)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario_conquista (
    usuario_id      INTEGER   NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    conquista_id    INTEGER   NOT NULL REFERENCES conquistas(id) ON DELETE CASCADE,
    data_conquistada TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (usuario_id, conquista_id)
);

-- -------------------------------------------------------------
-- Seed: conquistas padrão do MusicHorizon
-- -------------------------------------------------------------
INSERT INTO conquistas (nome, descricao, meta_quantidade, pontos_recompensa)
VALUES
    ('Primeiro Passo',       'Fez sua primeira busca',                          1,   10),
    ('Curador',              'Criou sua primeira playlist',                     1,   20),
    ('Explorador',           'Buscou 10 artistas diferentes',                  10,   30),
    ('Colecionador',         'Criou 5 playlists',                               5,   50),
    ('Descobridor',          'Descobriu 50 músicas',                           50,   80),
    ('Conectado',            'Conectou o Spotify',                              1,   40),
    ('Diverso',              'Buscou 5 gêneros diferentes',                     5,   40),
    ('Audiófilo',            'Descobriu 100 músicas',                         100,  150),
    ('Mestre Curador',       'Criou 10 playlists',                             10,  100),
    ('Lenda Musical',        'Alcançou o nível 8',                              8,  200)
ON CONFLICT DO NOTHING;

-- -------------------------------------------------------------
-- Tabela: playlists
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS playlists (
    id          SERIAL PRIMARY KEY,
    nome        VARCHAR(200) NOT NULL,
    data        TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_id  INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE
);

-- -------------------------------------------------------------
-- Tabela: musicas
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS musicas (
    id          SERIAL PRIMARY KEY,
    titulo      VARCHAR(300) NOT NULL,
    artista     VARCHAR(300),
    spotify_id  VARCHAR(100)
);

-- -------------------------------------------------------------
-- Tabela: playlist_musica (N:N – músicas de cada playlist)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS playlist_musica (
    playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    musica_id   INTEGER NOT NULL REFERENCES musicas(id) ON DELETE CASCADE,
    PRIMARY KEY (playlist_id, musica_id)
);
