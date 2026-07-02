import axios from 'axios';
import { IApiConnection } from './IApiConnection.js';

/**
 * SpotifyService
 * Implementação concreta de IApiConnection para a Spotify Web API.
 * Responsável por: validar tokens, buscar músicas e obter recomendações.
 */
export class SpotifyService extends IApiConnection {

    /**
     * Valida um Access Token do Spotify chamando o endpoint /me.
     * Utilizado na rota POST /usuario/:id/vincular-spotify.
     *
     * @param {string} token - Spotify Access Token enviado pelo frontend
     * @returns {boolean} true se o token é válido
     */
    async connectSpotify(token) {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Token válido se a requisição retornar 200 com dados do usuário
            return response.status === 200 && !!response.data.id;
        } catch (err) {
            if (err.response?.status === 401) {
                return false; // Token inválido ou expirado
            }
            throw err;
        }
    }

    /**
     * Busca músicas na Spotify Web API por um termo de pesquisa.
     *
     * @param {string} termo - Texto de busca (nome da música, artista, etc.)
     * @param {string} token - Spotify Access Token
     * @returns {object[]} Lista de músicas retornadas pela API
     */
    async buscarMusicas(termo, token) {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                q: termo,
                type: 'track',
                limit: 20,
                market: 'BR',
            },
        });
        return response.data.tracks?.items ?? [];
    }

    /**
     * Obtém recomendações de músicas via Spotify Recommendations API.
     *
     * @param {string[]} seedArtists - IDs de artistas semente (até 5)
     * @param {string} token - Spotify Access Token
     * @returns {object[]} Lista de músicas recomendadas
     */
    async obterRecomendacoes(seedArtists, token) {
        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                seed_artists: (Array.isArray(seedArtists) ? seedArtists : [seedArtists]).slice(0, 5).join(','),
                limit: 20,
                market: 'BR',
            },
        });
        return response.data.tracks ?? [];
    }

    /**
     * Exporta uma playlist para o Spotify do usuário.
     * Cria a playlist e adiciona as tracks.
     *
     * @param {object} playlist - Objeto Playlist com getNome() e getMusicas()
     * @param {string} token - Spotify Access Token do usuário
     * @returns {boolean} true se exportou com sucesso
     */
    async exportarParaSpotify(playlist, token) {
        const headers = { Authorization: `Bearer ${token}` };

        // Cria a playlist no Spotify
        const createResponse = await axios.post(
            'https://api.spotify.com/v1/me/playlists',
            { name: playlist.getNome(), public: false },
            { headers },
        );

        const playlistId = createResponse.data.id;

        // Adiciona as tracks à playlist
        const musicas = playlist.getMusicas();
        if (musicas && musicas.length > 0) {
            const uris = musicas.map(m => m.getSpotifyUri?.() ?? `spotify:track:${m.getId?.()}`);
            await axios.post(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                { uris },
                { headers },
            );
        }

        return true;
    }
}
