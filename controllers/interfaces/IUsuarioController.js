/**
 * Interface (classe base): IUsuarioController
 * Define o contrato do Controller de Usuario.
 */
export class IUsuarioController {
    async salvar(req, res) {
        throw new Error('IUsuarioController.salvar() não implementado');
    }

    async alterar(req, res) {
        throw new Error('IUsuarioController.alterar() não implementado');
    }

    async deletar(req, res) {
        throw new Error('IUsuarioController.deletar() não implementado');
    }

    async consultarTodos(req, res) {
        throw new Error('IUsuarioController.consultarTodos() não implementado');
    }

    async consultarPorId(req, res) {
        throw new Error('IUsuarioController.consultarPorId() não implementado');
    }

    async consultarPorLastfmUsername(req, res) {
        throw new Error('IUsuarioController.consultarPorLastfmUsername() não implementado');
    }

    async vincularSpotify(req, res) {
        throw new Error('IUsuarioController.vincularSpotify() não implementado');
    }
}
