/**
 * Interface (classe base): IConquistaDAO
 * Define o contrato do DAO de Conquista.
 */
export class IConquistaDAO {
    async salvar(conquista) {
        throw new Error('IConquistaDAO.salvar() não implementado');
    }

    async alterar(conquista) {
        throw new Error('IConquistaDAO.alterar() não implementado');
    }

    async deletar(conquista) {
        throw new Error('IConquistaDAO.deletar() não implementado');
    }

    async consultarTodos() {
        throw new Error('IConquistaDAO.consultarTodos() não implementado');
    }

    async consultarPorId(id) {
        throw new Error('IConquistaDAO.consultarPorId() não implementado');
    }

    async consultarDesbloqueadasPorUsuario(usuarioId) {
        throw new Error('IConquistaDAO.consultarDesbloqueadasPorUsuario() não implementado');
    }
}
