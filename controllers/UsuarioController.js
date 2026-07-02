import { IUsuarioController } from './interfaces/IUsuarioController.js';
import { Usuario } from '../model/object/Usuario.js';
import config from '../config.js';

// Carrega o DAO e o Service dinamicamente via config.js (padrão polimórfico)
const { UsuarioDAO_Postgres } = await import(`../persistencelayer/dao/${config.IUsuarioDAO}`);
const { SpotifyService } = await import(`../service/${config.ISpotifyService}`);

const usuarioDAO = new UsuarioDAO_Postgres();
const spotifyService = new SpotifyService();

/**
 * UsuarioController
 * Implementação concreta de IUsuarioController.
 * Coordena a lógica entre as rotas e a camada de persistência/serviços.
 * Segue os diagramas de sequência definidos no projeto.
 */
export class UsuarioController extends IUsuarioController {

    /**
     * POST /usuario
     * Cria um novo usuário.
     * Diagrama de sequência: ctrl→usuario.set*() → persistence.salvar(usuario)
     */
    async salvar(req, res) {
        try {
            const usuario = new Usuario();
            usuario.setLoginUsuario(req.body.loginUsuario);
            usuario.setDataCadastro(req.body.dataCadastro ?? new Date());
            usuario.setLastfmUsername(req.body.lastfmUsername ?? null);

            const resultado = await usuarioDAO.salvar(usuario);

            return res.status(201).json({
                msgcode: 'SUCCESS',
                usuario: resultado,
            });
        } catch (err) {
            console.error('[UsuarioController.salvar]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * PUT /usuario/:id
     * Atualiza dados de um usuário existente.
     */
    async alterar(req, res) {
        try {
            const usuario = new Usuario();
            usuario.setId(req.params.id);
            usuario.setLoginUsuario(req.body.loginUsuario);
            usuario.setDataCadastro(req.body.dataCadastro ?? new Date());
            usuario.setLastfmUsername(req.body.lastfmUsername ?? null);

            const resultado = await usuarioDAO.alterar(usuario);

            if (!resultado) {
                return res.status(404).json({ msgcode: 'ERROR', message: 'Usuário não encontrado' });
            }

            return res.status(200).json({ msgcode: 'SUCCESS', usuario: resultado });
        } catch (err) {
            console.error('[UsuarioController.alterar]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * DELETE /usuario/:id
     * Remove um usuário pelo id.
     */
    async deletar(req, res) {
        try {
            const usuario = new Usuario();
            usuario.setId(req.params.id);

            const resultado = await usuarioDAO.deletar(usuario);

            if (!resultado) {
                return res.status(404).json({ msgcode: 'ERROR', message: 'Usuário não encontrado' });
            }

            return res.status(200).json({ msgcode: 'SUCCESS' });
        } catch (err) {
            console.error('[UsuarioController.deletar]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * GET /usuario
     * Retorna todos os usuários cadastrados.
     */
    async consultarTodos(req, res) {
        try {
            const usuarios = await usuarioDAO.consultarTodos();
            return res.status(200).json({ msgcode: 'SUCCESS', usuarios });
        } catch (err) {
            console.error('[UsuarioController.consultarTodos]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * GET /usuario/:id
     * Retorna um usuário pelo id.
     */
    async consultarPorId(req, res) {
        try {
            const usuario = await usuarioDAO.consultarPorId(req.params.id);

            if (!usuario) {
                return res.status(404).json({ msgcode: 'ERROR', message: 'Usuário não encontrado' });
            }

            return res.status(200).json({ msgcode: 'SUCCESS', usuario });
        } catch (err) {
            console.error('[UsuarioController.consultarPorId]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * GET /usuario/lastfm/:username
     * Retorna um usuário pelo lastfmUsername.
     */
    async consultarPorLastfmUsername(req, res) {
        try {
            const usuario = await usuarioDAO.consultarPorLastfmUsername(req.params.username);

            if (!usuario) {
                return res.status(404).json({ msgcode: 'ERROR', message: 'Usuário não encontrado' });
            }

            return res.status(200).json({ msgcode: 'SUCCESS', usuario });
        } catch (err) {
            console.error('[UsuarioController.consultarPorLastfmUsername]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }

    /**
     * POST /usuario/:id/vincular-spotify
     * Valida o spotifyAuthToken enviado pelo frontend.
     * Diagrama de sequência: ctrl→service.connectSpotify(token) → boolean
     */
    async vincularSpotify(req, res) {
        try {
            const { spotifyAuthToken } = req.body;

            if (!spotifyAuthToken) {
                return res.status(400).json({ msgcode: 'ERROR', message: 'spotifyAuthToken é obrigatório' });
            }

            const conectado = await spotifyService.connectSpotify(spotifyAuthToken);

            if (!conectado) {
                return res.status(401).json({ msgcode: 'ERROR', message: 'Token do Spotify inválido ou expirado' });
            }

            return res.status(200).json({ msgcode: 'SUCCESS' });
        } catch (err) {
            console.error('[UsuarioController.vincularSpotify]', err);
            return res.status(500).json({ msgcode: 'ERROR', message: err.message });
        }
    }
}
