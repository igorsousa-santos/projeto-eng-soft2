import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import config from './config.js';

/**
 * app.js – Configuração do Express e registro das rotas.
 * Carrega as rotas dinamicamente via config.js (padrão polimórfico).
 */
const app = express();

// ── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Rota raiz ────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({
        name: 'MusicHorizon API',
        version: '1.0.0',
        status: 'online',
        endpoints: [
            'POST   /usuario',
            'GET    /usuario',
            'GET    /usuario/lastfm/:username',
            'GET    /usuario/:id',
            'PUT    /usuario/:id',
            'DELETE /usuario/:id',
            'POST   /usuario/:id/vincular-spotify',
            'GET    /conquista/usuario/:id',
            'POST   /playlist/gerar',
            'GET    /playlist/usuario/:id',
            'POST   /playlist/:id/exportar',
            'GET    /playlist/:id',
            'PUT    /playlist/:id',
            'DELETE /playlist/:id',
            'GET    /recomendacao/usuario/:id',
        ],
    });
});

// ── Carregamento dinâmico das rotas via config.js ────────────────────────────
const { RoutesUsuario }      = await import(`./routes/${config.IRoutesUsuario}`);
const { RoutesConquista }    = await import(`./routes/${config.IRoutesConquista}`);
const { RoutesPlaylist }     = await import(`./routes/${config.IRoutesPlaylist}`);
const { RoutesRecomendacao } = await import(`./routes/${config.IRoutesRecomendacao}`);

const routesUsuario      = new RoutesUsuario();
const routesConquista    = new RoutesConquista();
const routesPlaylist     = new RoutesPlaylist();
const routesRecomendacao = new RoutesRecomendacao();

app.use('/usuario',      routesUsuario.getRouter());
app.use('/conquista',    routesConquista.getRouter());
app.use('/playlist',     routesPlaylist.getRouter());
app.use('/recomendacao', routesRecomendacao.getRouter());

// ── Middleware de erros 404 ──────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ msgcode: 'ERROR', message: `Rota não encontrada: ${req.method} ${req.path}` });
});

// ── Middleware global de erros ───────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('[app] Erro não tratado:', err);
    res.status(500).json({ msgcode: 'ERROR', message: 'Erro interno do servidor' });
});

export default app;
