import { IMusicaDAO } from '../interfaces/IMusicaDAO.js';
import pool from '../database/connection.js';

/**
 * MusicaDAO_Postgres
 * Implementação concreta do IMusicaDAO para PostgreSQL (queries SQL nativas).
 */
export class MusicaDAO_Postgres extends IMusicaDAO {

    /**
     * Insere uma nova música no banco.
     * @param {Musica} musica
     * @returns {object} música salva com id gerado
     */
    async salvar(musica) {
        const json = musica.toJSON();
        const query = `
            INSERT INTO musicas (titulo, artista, spotify_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [
            json.titulo,
            json.artista ?? null,
            json.spotifyId ?? null,
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}
