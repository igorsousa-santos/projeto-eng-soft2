import { IUsuarioDAO } from '../interfaces/IUsuarioDAO.js';

/**
 * UsuarioDAO_InMemory
 * Implementação em memória do IUsuarioDAO para demo/StackBlitz (sem PostgreSQL).
 */
class UsuarioDAO_InMemory extends IUsuarioDAO {
    #usuarios;
    #nextId;

    constructor() {
        super();
        this.#nextId = 3;
        this.#usuarios = [
            { id: 1, login_usuario: 'alice_music', pontos: 150, lastfm_username: 'alice_fm', data_cadastro: new Date('2025-03-15') },
            { id: 2, login_usuario: 'bob_beats', pontos: 30, lastfm_username: 'bob_lastfm', data_cadastro: new Date('2025-06-20') },
        ];
    }

    async salvar(usuario) {
        const json = usuario.toJSON();
        const row = {
            id: this.#nextId++,
            login_usuario: json.loginUsuario,
            pontos: json.pontos ?? 0,
            lastfm_username: json.lastfmUsername ?? null,
            data_cadastro: json.dataCadastro ?? new Date(),
        };
        this.#usuarios.push(row);
        return row;
    }

    async alterar(usuario) {
        const json = usuario.toJSON();
        const idx = this.#usuarios.findIndex(u => u.id == json.id);
        if (idx === -1) return null;
        this.#usuarios[idx].login_usuario = json.loginUsuario;
        this.#usuarios[idx].lastfm_username = json.lastfmUsername ?? null;
        this.#usuarios[idx].data_cadastro = json.dataCadastro ?? new Date();
        return this.#usuarios[idx];
    }

    async deletar(usuario) {
        const json = usuario.toJSON();
        const idx = this.#usuarios.findIndex(u => u.id == json.id);
        if (idx === -1) return false;
        this.#usuarios.splice(idx, 1);
        return true;
    }

    async consultarTodos() {
        return this.#usuarios;
    }

    async consultarPorId(id) {
        return this.#usuarios.find(u => u.id == id) ?? null;
    }

    async consultarPorLastfmUsername(username) {
        return this.#usuarios.find(u => u.lastfm_username === username) ?? null;
    }
}

export { UsuarioDAO_InMemory };
export { UsuarioDAO_InMemory as UsuarioDAO_Postgres };
