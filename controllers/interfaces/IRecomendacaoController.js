/**
 * Interface (classe base): IRecomendacaoController
 * Define o contrato do Controller de Recomendação.
 */
export class IRecomendacaoController {
    async consultarPorUsuario(req, res) {
        throw new Error('IRecomendacaoController.consultarPorUsuario() não implementado');
    }
}
