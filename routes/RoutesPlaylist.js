import { Router } from 'express';
import config from '../config.js';

// Carrega o controller dinamicamente via config.js (padrão polimórfico)
const { PlaylistController } = await import(`../controllers/${config.IPlaylistController}`);
const ctrl = new PlaylistController();

/**
 * IRoutesPlaylist – Interface base das rotas de playlist.
 * Define o contrato que RoutesPlaylist deve implementar.
 */
export class IRoutesPlaylist {
    getRouter() {
        throw new Error('IRoutesPlaylist.getRouter() não implementado');
    }
}

/**
 * RoutesPlaylist
 * Implementação concreta de IRoutesPlaylist.
 * Mapeia os 6 endpoints conforme os diagramas de sequência.
 *
 * IMPORTANTE: A rota GET /usuario/:id deve ser registrada ANTES de GET /:id
 * e POST /:id/exportar deve vir ANTES de /:id para evitar conflito de parâmetros.
 */
export class RoutesPlaylist extends IRoutesPlaylist {
    #router;

    constructor() {
        super();
        this.#router = Router();
        this.#registerRoutes();
    }

    #registerRoutes() {
        // POST /playlist/gerar – gerar
        this.#router.post('/gerar', (req, res) => ctrl.gerar(req, res));

        // GET /playlist/usuario/:id – consultarPorUsuario
        // ⚠️ Deve vir ANTES de /:id para não ser capturado como id
        this.#router.get('/usuario/:id', (req, res) => ctrl.consultarPorUsuario(req, res));

        // POST /playlist/:id/exportar – exportar
        // ⚠️ Deve vir ANTES de /:id para não ser capturado como id
        this.#router.post('/:id/exportar', (req, res) => ctrl.exportar(req, res));

        // GET /playlist/:id – consultarPorId
        this.#router.get('/:id', (req, res) => ctrl.consultarPorId(req, res));

        // PUT /playlist/:id – alterar
        this.#router.put('/:id', (req, res) => ctrl.alterar(req, res));

        // DELETE /playlist/:id – deletar
        this.#router.delete('/:id', (req, res) => ctrl.deletar(req, res));
    }

    getRouter() {
        return this.#router;
    }
}
