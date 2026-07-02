/**
 * Interface (classe base): IPlaylistDAO
 * Define o contrato do DAO de Playlist – simula uma interface via polimorfismo JS.
 * Todas as implementações concretas devem herdar desta classe e sobrescrever os métodos.
 */
export class IPlaylistDAO {
    async salvar(playlist) {
        throw new Error('IPlaylistDAO.salvar() não implementado');
    }

    async alterar(playlist) {
        throw new Error('IPlaylistDAO.alterar() não implementado');
    }

    async deletar(id) {
        throw new Error('IPlaylistDAO.deletar() não implementado');
    }

    async consultarPorId(id) {
        throw new Error('IPlaylistDAO.consultarPorId() não implementado');
    }

    async consultarPorUsuario(usuarioId) {
        throw new Error('IPlaylistDAO.consultarPorUsuario() não implementado');
    }
}
