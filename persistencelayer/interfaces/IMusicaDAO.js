/**
 * Interface (classe base): IMusicaDAO
 * Define o contrato do DAO de Musica – simula uma interface via polimorfismo JS.
 * Todas as implementações concretas devem herdar desta classe e sobrescrever os métodos.
 */
export class IMusicaDAO {
    async salvar(musica) {
        throw new Error('IMusicaDAO.salvar() não implementado');
    }
}
