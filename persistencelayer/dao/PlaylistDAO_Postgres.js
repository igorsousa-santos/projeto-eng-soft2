import { IPlaylistDAO } from '../interfaces/IPlaylistDAO.js';
import pool from '../database/connection.js';

/**
 * PlaylistDAO_Postgres
 * Implementação concreta do IPlaylistDAO para PostgreSQL (queries SQL nativas).
 */
export class PlaylistDAO_Postgres extends IPlaylistDAO {

    /**
     * Insere uma nova playlist e suas músicas associadas.
     * @param {Playlist} playlist
     * @returns {object} playlist salva com id gerado
     */
    async salvar(playlist) {
        const json = playlist.toJSON();
        const query = `
            INSERT INTO playlists (nome, data, usuario_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [
            json.nome,
            json.data ?? new Date(),
            json.usuarioId,
        ];
        const result = await pool.query(query, values);
        const row = result.rows[0];

        // Insere as músicas na tabela de junção
        if (json.musicas && json.musicas.length > 0) {
            for (const musica of json.musicas) {
                await pool.query(
                    `INSERT INTO playlist_musica (playlist_id, musica_id) VALUES ($1, $2)`,
                    [row.id, musica.id]
                );
            }
        }

        return row;
    }

    /**
     * Atualiza nome e data de uma playlist existente.
     * @param {Playlist} playlist
     * @returns {object|null} playlist atualizada
     */
    async alterar(playlist) {
        const json = playlist.toJSON();
        const query = `
            UPDATE playlists
               SET nome = $1,
                   data = $2
             WHERE id = $3
            RETURNING *
        `;
        const values = [
            json.nome,
            json.data ?? new Date(),
            json.id,
        ];
        const result = await pool.query(query, values);
        return result.rows[0] ?? null;
    }

    /**
     * Remove uma playlist pelo id.
     * @param {number} id
     * @returns {boolean}
     */
    async deletar(id) {
        const query = `DELETE FROM playlists WHERE id = $1`;
        const result = await pool.query(query, [id]);
        return result.rowCount > 0;
    }

    /**
     * Consulta uma playlist pelo id, incluindo suas músicas.
     * @param {number} id
     * @returns {object|null} playlist com array de musicas
     */
    async consultarPorId(id) {
        const query = `SELECT * FROM playlists WHERE id = $1`;
        const result = await pool.query(query, [id]);
        const playlist = result.rows[0] ?? null;

        if (!playlist) return null;

        // Busca as músicas associadas via tabela de junção
        const musicasQuery = `
            SELECT m.*
              FROM musicas m
              JOIN playlist_musica pm ON pm.musica_id = m.id
             WHERE pm.playlist_id = $1
        `;
        const musicasResult = await pool.query(musicasQuery, [id]);
        playlist.musicas = musicasResult.rows;

        return playlist;
    }

    /**
     * Consulta todas as playlists de um usuário.
     * @param {number} usuarioId
     * @returns {object[]}
     */
    async consultarPorUsuario(usuarioId) {
        const query = `SELECT * FROM playlists WHERE usuario_id = $1 ORDER BY id`;
        const result = await pool.query(query, [usuarioId]);
        return result.rows;
    }
}
