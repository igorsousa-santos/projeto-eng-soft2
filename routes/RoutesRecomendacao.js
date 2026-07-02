import { Router } from 'express';
import config from '../config.js';

// Carrega o controller dinamicamente via config.js
const { RecomendacaoController } = await import(`../controllers/${config.IRecomendacaoController}`);
const ctrl = new RecomendacaoController();

/**
 * IRoutesRecomendacao – Interface base das rotas de recomendação.
 */
export class IRoutesRecomendacao {
    getRouter() {
        throw new Error('IRoutesRecomendacao.getRouter() não implementado');
    }
}

/**
 * RoutesRecomendacao
 * Implementação concreta de IRoutesRecomendacao.
 * Mapeia o endpoint conforme o diagrama de sequência.
 */
export class RoutesRecomendacao extends IRoutesRecomendacao {
    #router;

    constructor() {
        super();
        this.#router = Router();
        this.#registerRoutes();
    }

    #registerRoutes() {
        // GET /recomendacao/usuario/:id – consultarPorUsuario
        this.#router.get('/usuario/:id', (req, res) => ctrl.consultarPorUsuario(req, res));
    }

    getRouter() {
        return this.#router;
    }
}
