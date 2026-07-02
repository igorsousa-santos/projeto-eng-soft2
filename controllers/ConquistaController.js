import { IConquistaController } from './interfaces/IConquistaController.js';
import config from '../config.js';

// Carrega o DAO dinamicamente via config.js
const { ConquistaDAO_Postgres } = await import(`../persistencelayer/dao/${config.IConquistaDAO}`);

const conquistaDAO = new ConquistaDAO_Postgres();

/**
 * ConquistaController
 * Implementação concreta de IConquistaController.
 */
export class ConquistaController extends IConquistaController {

    /**
     * GET /conquista/usuario/:id
     * Retorna as conquistas desbloqueadas por um usuário.
     * Diagrama de sequência: ctrl→persistence.consultarDesbloqueadasPorUsuario(req.id) → conquistas
     */
    async consultarPorUsuario(req, res) {
        try {
            const conquistas = await conquistaDAO.consultarDesbloqueadasPorUsuario(req.params.id);
            return res.status(200).json({ msgcode: 'SUCCESS', conquistas });
        } catch (err) {
            console.error('[ConquistaController.consultarPorUsuario]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }
}
