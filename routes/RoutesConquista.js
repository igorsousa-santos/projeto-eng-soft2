import { Router } from 'express';
import config from '../config.js';

// Carrega o controller dinamicamente via config.js
const { ConquistaController } = await import(`../controllers/${config.IConquistaController}`);
const ctrl = new ConquistaController();

/**
 * IRoutesConquista – Interface base das rotas de conquista.
 */
export class IRoutesConquista {
    getRouter() {
        throw new Error('IRoutesConquista.getRouter() não implementado');
    }
}

/**
 * RoutesConquista
 * Implementação concreta de IRoutesConquista.
 * Mapeia o endpoint conforme o diagrama de sequência.
 */
export class RoutesConquista extends IRoutesConquista {
    #router;

    constructor() {
        super();
        this.#router = Router();
        this.#registerRoutes();
    }

    #registerRoutes() {
        // GET /conquista/usuario/:id – consultarPorUsuario
        this.#router.get('/usuario/:id', (req, res) => ctrl.consultarPorUsuario(req, res));
    }

    getRouter() {
        return this.#router;
    }
}
