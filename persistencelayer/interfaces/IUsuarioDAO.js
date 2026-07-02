/**
 * Interface (classe base): IUsuarioDAO
 * Define o contrato do DAO de Usuario – simula uma interface via polimorfismo JS.
 * Todas as implementações concretas devem herdar desta classe e sobrescrever os métodos.
 */
export class IUsuarioDAO {
    async salvar(usuario) {
        throw new Error('IUsuarioDAO.salvar() não implementado');
    }

    async alterar(usuario) {
        throw new Error('IUsuarioDAO.alterar() não implementado');
    }

    async deletar(usuario) {
        throw new Error('IUsuarioDAO.deletar() não implementado');
    }

    async consultarTodos() {
        throw new Error('IUsuarioDAO.consultarTodos() não implementado');
    }

    async consultarPorId(id) {
        throw new Error('IUsuarioDAO.consultarPorId() não implementado');
    }

    async consultarPorLastfmUsername(username) {
        throw new Error('IUsuarioDAO.consultarPorLastfmUsername() não implementado');
    }
}
