/**
 * Interface (classe base): IApiConnection
 * Define o contrato de serviços de API externos (Spotify, etc.).
 */
export class IApiConnection {
    /**
     * Valida um Access Token de uma API externa.
     * Utilizado na rota POST /usuario/:id/vincular-spotify.
     * @param {string} token - Token de autenticação enviado pelo frontend
     * @returns {boolean} true se o token é válido
     */
    async connectSpotify(token) {
        throw new Error('IApiConnection.connectSpotify() não implementado');
    }

    async buscarMusicas(termo) {
        throw new Error('IApiConnection.buscarMusicas() não implementado');
    }

    async obterRecomendacoes(usuarioId) {
        throw new Error('IApiConnection.obterRecomendacoes() não implementado');
    }

    async exportarParaSpotify(playlist, token) {
        throw new Error('IApiConnection.exportarParaSpotify() não implementado');
    }
}
