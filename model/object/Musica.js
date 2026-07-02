/**
 * Model: Musica
 * Representa uma música no sistema MusicHorizon.
 */
export class Musica {
    #id;
    #titulo;
    #artista;
    #spotifyId;

    constructor() {
        this.#id = null;
        this.#titulo = null;
        this.#artista = null;
        this.#spotifyId = null;
    }

    // ── Setters ──────────────────────────────────────────────

    setId(id) {
        this.#id = id;
        return true;
    }

    setTitulo(titulo) {
        this.#titulo = titulo;
        return true;
    }

    setArtista(artista) {
        this.#artista = artista;
        return true;
    }

    setSpotifyId(spotifyId) {
        this.#spotifyId = spotifyId;
        return true;
    }

    // ── Getters ──────────────────────────────────────────────

    getId() {
        return this.#id;
    }

    getTitulo() {
        return this.#titulo;
    }

    getArtista() {
        return this.#artista;
    }

    getSpotifyId() {
        return this.#spotifyId;
    }

    /** Retorna representação JSON do objeto (usado pelo DAO). */
    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            artista: this.#artista,
            spotifyId: this.#spotifyId,
        };
    }
}
