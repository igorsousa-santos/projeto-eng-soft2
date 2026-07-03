import { IMusicaDAO } from '../interfaces/IMusicaDAO.js';

/**
 * MusicaDAO_InMemory
 * Implementação em memória do IMusicaDAO para demo/StackBlitz.
 */
class MusicaDAO_InMemory extends IMusicaDAO {
    #musicas;
    #nextId;

    constructor() {
        super();
        this.#nextId = 100;
        this.#musicas = [];
    }

    async salvar(musica) {
        const json = musica.toJSON();
        const row = {
            id: this.#nextId++,
            titulo: json.titulo,
            artista: json.artista ?? null,
            spotify_id: json.spotifyId ?? null,
        };
        this.#musicas.push(row);
        return row;
    }
}

export { MusicaDAO_InMemory };
export { MusicaDAO_InMemory as MusicaDAO_Postgres };
