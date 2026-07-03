import { IPlaylistDAO } from '../interfaces/IPlaylistDAO.js';
import { Playlist } from '../../model/object/Playlist.js';
import { Musica } from '../../model/object/Musica.js';

/**
 * PlaylistDAO_InMemory
 * Implementação em memória do IPlaylistDAO para demo/StackBlitz.
 * Retorna instâncias de Playlist (model) para compatibilidade com PlaylistController.
 */
class PlaylistDAO_InMemory extends IPlaylistDAO {
    #playlists;
    #musicas;
    #playlistMusica;
    #nextPlaylistId;
    #nextMusicaId;

    constructor() {
        super();
        this.#nextPlaylistId = 3;
        this.#nextMusicaId = 6;

        this.#musicas = [
            { id: 1, titulo: 'Bohemian Rhapsody', artista: 'Queen', spotify_id: null },
            { id: 2, titulo: 'Stairway to Heaven', artista: 'Led Zeppelin', spotify_id: null },
            { id: 3, titulo: 'Hotel California', artista: 'Eagles', spotify_id: null },
            { id: 4, titulo: 'Imagine', artista: 'John Lennon', spotify_id: null },
            { id: 5, titulo: 'Garota de Ipanema', artista: 'Tom Jobim', spotify_id: null },
        ];

        this.#playlists = [
            { id: 1, nome: 'Rock Clássico', data: new Date('2025-04-01'), usuario_id: 1 },
            { id: 2, nome: 'Chill Vibes', data: new Date('2025-06-25'), usuario_id: 2 },
        ];

        this.#playlistMusica = [
            { playlist_id: 1, musica_id: 1 },
            { playlist_id: 1, musica_id: 2 },
            { playlist_id: 1, musica_id: 3 },
            { playlist_id: 2, musica_id: 4 },
            { playlist_id: 2, musica_id: 5 },
        ];
    }

    /** Converte dados armazenados em uma instância Playlist (model). */
    #hydrate(row) {
        const p = new Playlist();
        p.setId(row.id);
        p.setNome(row.nome);
        p.setData(row.data);
        p.setUsuarioId(row.usuario_id);

        const links = this.#playlistMusica.filter(pm => pm.playlist_id === row.id);
        for (const link of links) {
            const mRow = this.#musicas.find(m => m.id === link.musica_id);
            if (mRow) {
                const musica = new Musica();
                musica.setId(mRow.id);
                musica.setTitulo(mRow.titulo);
                musica.setArtista(mRow.artista);
                musica.setSpotifyId(mRow.spotify_id);
                p.addMusica(musica);
            }
        }
        return p;
    }

    async salvar(playlist) {
        const json = playlist.toJSON();
        const row = {
            id: this.#nextPlaylistId++,
            nome: json.nome,
            data: json.data ?? new Date(),
            usuario_id: json.usuarioId,
        };
        this.#playlists.push(row);

        if (json.musicas && json.musicas.length > 0) {
            for (const m of json.musicas) {
                this.#playlistMusica.push({ playlist_id: row.id, musica_id: m.id });
            }
        }
        return row;
    }

    async alterar(playlist) {
        const json = playlist.toJSON ? playlist.toJSON() : playlist;
        const idx = this.#playlists.findIndex(p => p.id == json.id);
        if (idx === -1) return null;
        this.#playlists[idx].nome = json.nome;
        this.#playlists[idx].data = json.data ?? new Date();
        return this.#playlists[idx];
    }

    async deletar(id) {
        const idx = this.#playlists.findIndex(p => p.id == id);
        if (idx === -1) return false;
        this.#playlists.splice(idx, 1);
        this.#playlistMusica = this.#playlistMusica.filter(pm => pm.playlist_id != id);
        return true;
    }

    async consultarPorId(id) {
        const row = this.#playlists.find(p => p.id == id);
        if (!row) return null;
        return this.#hydrate(row);
    }

    async consultarPorUsuario(usuarioId) {
        const rows = this.#playlists.filter(p => p.usuario_id == usuarioId);
        return rows.map(r => this.#hydrate(r));
    }
}

export { PlaylistDAO_InMemory };
export { PlaylistDAO_InMemory as PlaylistDAO_Postgres };
