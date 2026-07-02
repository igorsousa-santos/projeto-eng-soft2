import { Router } from 'express';
import config from '../config.js';

// Carrega o controller dinamicamente via config.js (padrão polimórfico)
const { UsuarioController } = await import(`../controllers/${config.IUsuarioController}`);
const ctrl = new UsuarioController();

/**
 * IRoutesUsuario – Interface base das rotas de usuário.
 * Define o contrato que RoutesUsuario deve implementar.
 */
export class IRoutesUsuario {
    getRouter() {
        throw new Error('IRoutesUsuario.getRouter() não implementado');
    }
}

/**
 * RoutesUsuario
 * Implementação concreta de IRoutesUsuario.
 * Mapeia os 7 endpoints conforme os diagramas de sequência.
 *
 * IMPORTANTE: A rota GET /lastfm/:username deve ser registrada ANTES de GET /:id
 * para evitar conflito de parâmetros no Express.
 */
export class RoutesUsuario extends IRoutesUsuario {
    #router;

    constructor() {
        super();
        this.#router = Router();
        this.#registerRoutes();
    }

    #registerRoutes() {
        // POST /usuario – salvar
        this.#router.post('/', (req, res) => ctrl.salvar(req, res));

        // GET /usuario – consultarTodos
        this.#router.get('/', (req, res) => ctrl.consultarTodos(req, res));

        // GET /usuario/lastfm/:username – consultarPorLastfmUsername
        // ⚠️ Deve vir ANTES de /:id para não ser capturado como id
        this.#router.get('/lastfm/:username', (req, res) => ctrl.consultarPorLastfmUsername(req, res));

        // GET /usuario/:id – consultarPorId
        this.#router.get('/:id', (req, res) => ctrl.consultarPorId(req, res));

        // PUT /usuario/:id – alterar
        this.#router.put('/:id', (req, res) => ctrl.alterar(req, res));

        // DELETE /usuario/:id – deletar
        this.#router.delete('/:id', (req, res) => ctrl.deletar(req, res));

        // POST /usuario/:id/vincular-spotify – vincularSpotify
        this.#router.post('/:id/vincular-spotify', (req, res) => ctrl.vincularSpotify(req, res));
    }

    getRouter() {
        return this.#router;
    }
}
