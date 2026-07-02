/**
 * Interface (classe base): IPlaylistController
 * Define o contrato do Controller de Playlist.
 */
export class IPlaylistController {
    async gerar(req, res) {
        throw new Error('IPlaylistController.gerar() não implementado');
    }

    async consultarPorUsuario(req, res) {
        throw new Error('IPlaylistController.consultarPorUsuario() não implementado');
    }

    async consultarPorId(req, res) {
        throw new Error('IPlaylistController.consultarPorId() não implementado');
    }

    async alterar(req, res) {
        throw new Error('IPlaylistController.alterar() não implementado');
    }

    async deletar(req, res) {
        throw new Error('IPlaylistController.deletar() não implementado');
    }

    async exportar(req, res) {
        throw new Error('IPlaylistController.exportar() não implementado');
    }
}
