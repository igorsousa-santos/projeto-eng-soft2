/**
 * Model: Playlist
 * Representa uma playlist de músicas no sistema MusicHorizon.
 */
export class Playlist {
    #id;
    #nome;
    #data;
    #usuarioId;
    #musicas;

    constructor() {
        this.#id = null;
        this.#nome = null;
        this.#data = null;
        this.#usuarioId = null;
        this.#musicas = [];
    }

    // ── Setters ──────────────────────────────────────────────

    setId(id) {
        this.#id = id;
        return true;
    }

    setNome(nome) {
        this.#nome = nome;
        return true;
    }

    setData(data) {
        this.#data = data;
        return true;
    }

    setUsuarioId(usuarioId) {
        this.#usuarioId = usuarioId;
        return true;
    }

    // ── Getters ──────────────────────────────────────────────

    getId() {
        return this.#id;
    }

    getNome() {
        return this.#nome;
    }

    getData() {
        return this.#data;
    }

    getUsuarioId() {
        return this.#usuarioId;
    }

    getQuantidadeMusica() {
        return this.#musicas.length;
    }

    getMusicas() {
        return this.#musicas;
    }

    // ── Métodos de negócio ───────────────────────────────────

    addMusica(musica) {
        this.#musicas.push(musica);
        return true;
    }

    /** Retorna representação JSON do objeto (usado pelo DAO). */
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            data: this.#data,
            usuarioId: this.#usuarioId,
            musicas: this.#musicas.map(m => m.toJSON ? m.toJSON() : m),
        };
    }
}
