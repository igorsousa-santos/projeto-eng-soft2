import { IUsuarioDAO } from '../interfaces/IUsuarioDAO.js';
import pool from '../database/connection.js';

/**
 * UsuarioDAO_Postgres
 * Implementação concreta do IUsuarioDAO para PostgreSQL (queries SQL nativas).
 */
export class UsuarioDAO_Postgres extends IUsuarioDAO {

    /**
     * POST /usuario – Insere um novo usuário no banco.
     * @param {Usuario} usuario
     * @returns {object} usuário salvo com id gerado
     */
    async salvar(usuario) {
        const json = usuario.toJSON();
        const query = `
            INSERT INTO usuarios (login_usuario, pontos, lastfm_username, data_cadastro)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [
            json.loginUsuario,
            json.pontos ?? 0,
            json.lastfmUsername ?? null,
            json.dataCadastro ?? new Date(),
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    /**
     * PUT /usuario/:id – Atualiza dados do usuário.
     * @param {Usuario} usuario
     * @returns {object} usuário atualizado
     */
    async alterar(usuario) {
        const json = usuario.toJSON();
        const query = `
            UPDATE usuarios
               SET login_usuario   = $1,
                   lastfm_username = $2,
                   data_cadastro   = $3
             WHERE id = $4
            RETURNING *
        `;
        const values = [
            json.loginUsuario,
            json.lastfmUsername ?? null,
            json.dataCadastro ?? new Date(),
            json.id,
        ];
        const result = await pool.query(query, values);
        return result.rows[0] ?? null;
    }

    /**
     * DELETE /usuario/:id – Remove um usuário pelo id.
     * @param {Usuario} usuario
     * @returns {boolean}
     */
    async deletar(usuario) {
        const json = usuario.toJSON();
        const query = `DELETE FROM usuarios WHERE id = $1`;
        const result = await pool.query(query, [json.id]);
        return result.rowCount > 0;
    }

    /**
     * GET /usuario – Retorna todos os usuários.
     * @returns {object[]}
     */
    async consultarTodos() {
        const query = `SELECT * FROM usuarios ORDER BY id`;
        const result = await pool.query(query);
        return result.rows;
    }

    /**
     * GET /usuario/:id – Retorna um usuário por id.
     * @param {number} id
     * @returns {object|null}
     */
    async consultarPorId(id) {
        const query = `SELECT * FROM usuarios WHERE id = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0] ?? null;
    }

    /**
     * GET /usuario/lastfm/:username – Retorna um usuário pelo lastfmUsername.
     * @param {string} username
     * @returns {object|null}
     */
    async consultarPorLastfmUsername(username) {
        const query = `SELECT * FROM usuarios WHERE lastfm_username = $1`;
        const result = await pool.query(query, [username]);
        return result.rows[0] ?? null;
    }
}
