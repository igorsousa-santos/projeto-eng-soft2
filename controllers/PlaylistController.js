import { IPlaylistController } from './interfaces/IPlaylistController.js';
import { Playlist } from '../model/object/Playlist.js';
import { Musica } from '../model/object/Musica.js';
import config from '../config.js';

// Carrega o DAO e o Service dinamicamente via config.js (padrão polimórfico)
const { PlaylistDAO_Postgres } = await import(`../persistencelayer/dao/${config.IPlaylistDAO}`);
const { UsuarioDAO_Postgres } = await import(`../persistencelayer/dao/${config.IUsuarioDAO}`);
const { SpotifyService } = await import(`../service/${config.ISpotifyService}`);

const playlistDAO = new PlaylistDAO_Postgres();
const usuarioDAO = new UsuarioDAO_Postgres();
const spotifyService = new SpotifyService();

/**
 * PlaylistController
 * Implementação concreta de IPlaylistController.
 * Coordena a lógica entre as rotas e a camada de persistência/serviços.
 * Segue os diagramas de sequência definidos no projeto.
 */
export class PlaylistController extends IPlaylistController {

    /**
     * POST /playlist/gerar
     * Gera uma nova playlist a partir de um prompt.
     * Diagrama de sequência: ctrl→service.buscarMusicas(prompt) → cria Playlist e Musicas → persistence.salvar(playlist)
     */
    async gerar(req, res) {
        try {
            const dados = await spotifyService.buscarMusicas(req.body.prompt);

            const playlist = new Playlist();

            for (const item of dados) {
                const musica = new Musica();
                musica.setTitulo(item.name ?? item.titulo);
                playlist.addMusica(musica);
            }

            const resultado = await playlistDAO.salvar(playlist);

            return res.status(201).json({ msgcode: 'SUCCESS', resultado });
        } catch (err) {
            console.error('[PlaylistController.gerar]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * GET /playlist/usuario/:id
     * Retorna as playlists de um usuário.
     * Diagrama de sequência: ctrl→persistence.consultarPorUsuario(id) → lista
     */
    async consultarPorUsuario(req, res) {
        try {
            const playlists = await playlistDAO.consultarPorUsuario(req.params.id);

            const lista = playlists.map(p => ({
                nome: p.getNome(),
                quantidadeMusica: p.getQuantidadeMusica(),
            }));

            return res.status(200).json({ msgcode: 'SUCCESS', playlists: lista });
        } catch (err) {
            console.error('[PlaylistController.consultarPorUsuario]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * GET /playlist/:id
     * Retorna uma playlist pelo id.
     * Diagrama de sequência: ctrl→persistence.consultarPorId(id) → playlist
     */
    async consultarPorId(req, res) {
        try {
            const playlist = await playlistDAO.consultarPorId(req.params.id);

            if (!playlist) {
                return res.status(404).json({ msgcode: 'ERROR', message: 'Playlist não encontrada' });
            }

            return res.status(200).json({
                msgcode: 'SUCCESS',
                playlist: {
                    nome: playlist.getNome(),
                    quantidadeMusica: playlist.getQuantidadeMusica(),
                },
            });
        } catch (err) {
            console.error('[PlaylistController.consultarPorId]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * PUT /playlist/:id
     * Altera uma playlist existente.
     * Diagrama de sequência: ctrl→persistence.consultarPorId(id) → set nome/data → persistence.alterar(playlist)
     */
    async alterar(req, res) {
        try {
            const playlist = await playlistDAO.consultarPorId(req.params.id);

            if (!playlist) {
                return res.status(404).json({ msgcode: 'ERROR', message: 'Playlist não encontrada' });
            }

            playlist.setNome(req.body.nome);
            playlist.setData(req.body.data);

            const resultado = await playlistDAO.alterar(playlist);

            return res.status(200).json({ msgcode: 'SUCCESS', resultado });
        } catch (err) {
            console.error('[PlaylistController.alterar]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * DELETE /playlist/:id
     * Remove uma playlist pelo id.
     * Diagrama de sequência: ctrl→persistence.deletar(id) → boolean
     */
    async deletar(req, res) {
        try {
            const resultado = await playlistDAO.deletar(req.params.id);

            if (!resultado) {
                return res.status(404).json({ msgcode: 'ERROR', message: 'Playlist não encontrada' });
            }

            return res.status(200).json({ msgcode: 'SUCCESS' });
        } catch (err) {
            console.error('[PlaylistController.deletar]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * POST /playlist/:id/exportar
     * Exporta uma playlist para o Spotify.
     * Diagrama de sequência: ctrl→pPlaylist.consultarPorId(id) → pUsuario.consultarPorId(usuarioId) → usuario.getSpotifyToken() → service.exportarParaSpotify(playlist, token)
     */
    async exportar(req, res) {
        try {
            const playlist = await playlistDAO.consultarPorId(req.params.id);

            if (!playlist) {
                return res.status(404).json({ msgcode: 'ERROR', message: 'Playlist não encontrada' });
            }

            const usuario = await usuarioDAO.consultarPorId(req.body.usuarioId);

            if (!usuario) {
                return res.status(404).json({ msgcode: 'ERROR', message: 'Usuário não encontrado' });
            }

            const token = usuario.getSpotifyToken();

            const resultado = await spotifyService.exportarParaSpotify(playlist, token);

            return res.status(200).json({ msgcode: 'SUCCESS', resultado });
        } catch (err) {
            console.error('[PlaylistController.exportar]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }
}
