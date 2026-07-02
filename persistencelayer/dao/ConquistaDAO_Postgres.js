import { IConquistaDAO } from '../interfaces/IConquistaDAO.js';
import pool from '../database/connection.js';

/**
 * ConquistaDAO_Postgres
 * Implementação concreta do IConquistaDAO para PostgreSQL.
 */
export class ConquistaDAO_Postgres extends IConquistaDAO {

    /**
     * Insere uma conquista no catálogo.
     * @param {Conquista} conquista
     * @returns {object}
     */
    async salvar(conquista) {
        const json = conquista.toJSON();
        const query = `
            INSERT INTO conquistas (nome, descricao, meta_quantidade, pontos_recompensa)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [json.nome, json.descricao, json.metaQuantidade, json.pontosRecompensa];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    /**
     * Atualiza uma conquista do catálogo.
     * @param {Conquista} conquista
     * @returns {object|null}
     */
    async alterar(conquista) {
        const json = conquista.toJSON();
        const query = `
            UPDATE conquistas
               SET nome              = $1,
                   descricao         = $2,
                   meta_quantidade   = $3,
                   pontos_recompensa = $4
             WHERE id = $5
            RETURNING *
        `;
        const values = [json.nome, json.descricao, json.metaQuantidade, json.pontosRecompensa, json.id];
        const result = await pool.query(query, values);
        return result.rows[0] ?? null;
    }

    /**
     * Remove uma conquista do catálogo.
     * @param {Conquista} conquista
     * @returns {boolean}
     */
    async deletar(conquista) {
        const json = conquista.toJSON();
        const result = await pool.query(`DELETE FROM conquistas WHERE id = $1`, [json.id]);
        return result.rowCount > 0;
    }

    /**
     * Retorna todo o catálogo de conquistas.
     * @returns {object[]}
     */
    async consultarTodos() {
        const result = await pool.query(`SELECT * FROM conquistas ORDER BY id`);
        return result.rows;
    }

    /**
     * Retorna uma conquista pelo id.
     * @param {number} id
     * @returns {object|null}
     */
    async consultarPorId(id) {
        const result = await pool.query(`SELECT * FROM conquistas WHERE id = $1`, [id]);
        return result.rows[0] ?? null;
    }

    /**
     * GET /conquista/usuario/:id
     * Retorna as conquistas já desbloqueadas por um usuário específico,
     * com a data em que foram conquistadas.
     *
     * @param {number} usuarioId
     * @returns {object[]}
     */
    async consultarDesbloqueadasPorUsuario(usuarioId) {
        const query = `
            SELECT c.id,
                   c.nome,
                   c.descricao,
                   c.meta_quantidade,
                   c.pontos_recompensa,
                   uc.data_conquistada
              FROM conquistas c
              JOIN usuario_conquista uc ON uc.conquista_id = c.id
             WHERE uc.usuario_id = $1
             ORDER BY uc.data_conquistada DESC
        `;
        const result = await pool.query(query, [usuarioId]);
        return result.rows;
    }
}
