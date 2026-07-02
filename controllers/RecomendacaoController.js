import { IRecomendacaoController } from './interfaces/IRecomendacaoController.js';
import { Musica } from '../model/object/Musica.js';
import config from '../config.js';

// Carrega o DAO e o Service dinamicamente via config.js
const { MusicaDAO_Postgres } = await import(`../persistencelayer/dao/${config.IMusicaDAO}`);
const { SpotifyService } = await import(`../service/${config.ISpotifyService}`);

const musicaDAO = new MusicaDAO_Postgres();
const spotifyService = new SpotifyService();

/**
 * RecomendacaoController
 * Implementação concreta de IRecomendacaoController.
 */
export class RecomendacaoController extends IRecomendacaoController {

    /**
     * GET /recomendacao/usuario/:id
     * Obtém recomendações de músicas para um usuário.
     * Diagrama de sequência: ctrl→service.obterRecomendacoes(id) → cria Musicas → persistence.salvar(musica) → lista
     */
    async consultarPorUsuario(req, res) {
        try {
            const dados = await spotifyService.obterRecomendacoes(req.params.id);

            const musicas = [];
            for (const item of dados) {
                const musica = new Musica();
                musica.setTitulo(item.name ?? item.titulo);
                await musicaDAO.salvar(musica);
                musicas.push(musica);
            }

            return res.status(200).json({ msgcode: 'SUCCESS', musicas });
        } catch (err) {
            console.error('[RecomendacaoController.consultarPorUsuario]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }
}
