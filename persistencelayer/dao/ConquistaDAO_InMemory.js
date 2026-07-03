import { IConquistaDAO } from '../interfaces/IConquistaDAO.js';

/**
 * ConquistaDAO_InMemory
 * Implementação em memória do IConquistaDAO para demo/StackBlitz.
 */
class ConquistaDAO_InMemory extends IConquistaDAO {
    #conquistas;
    #usuarioConquista;
    #nextId;

    constructor() {
        super();
        this.#nextId = 11;
        this.#conquistas = [
            { id: 1, nome: 'Primeiro Passo', descricao: 'Fez sua primeira busca', meta_quantidade: 1, pontos_recompensa: 10 },
            { id: 2, nome: 'Curador', descricao: 'Criou sua primeira playlist', meta_quantidade: 1, pontos_recompensa: 20 },
            { id: 3, nome: 'Explorador', descricao: 'Buscou 10 artistas diferentes', meta_quantidade: 10, pontos_recompensa: 30 },
            { id: 4, nome: 'Colecionador', descricao: 'Criou 5 playlists', meta_quantidade: 5, pontos_recompensa: 50 },
            { id: 5, nome: 'Descobridor', descricao: 'Descobriu 50 músicas', meta_quantidade: 50, pontos_recompensa: 80 },
            { id: 6, nome: 'Conectado', descricao: 'Conectou o Spotify', meta_quantidade: 1, pontos_recompensa: 40 },
            { id: 7, nome: 'Diverso', descricao: 'Buscou 5 gêneros diferentes', meta_quantidade: 5, pontos_recompensa: 40 },
            { id: 8, nome: 'Audiófilo', descricao: 'Descobriu 100 músicas', meta_quantidade: 100, pontos_recompensa: 150 },
            { id: 9, nome: 'Mestre Curador', descricao: 'Criou 10 playlists', meta_quantidade: 10, pontos_recompensa: 100 },
            { id: 10, nome: 'Lenda Musical', descricao: 'Alcançou o nível 8', meta_quantidade: 8, pontos_recompensa: 200 },
        ];
        // User 1 unlocked conquistas 1 and 2
        this.#usuarioConquista = [
            { usuario_id: 1, conquista_id: 1, data_conquistada: new Date('2025-03-16') },
            { usuario_id: 1, conquista_id: 2, data_conquistada: new Date('2025-04-01') },
            { usuario_id: 1, conquista_id: 6, data_conquistada: new Date('2025-04-10') },
        ];
    }

    async salvar(conquista) {
        const json = conquista.toJSON();
        const row = {
            id: this.#nextId++,
            nome: json.nome,
            descricao: json.descricao,
            meta_quantidade: json.metaQuantidade,
            pontos_recompensa: json.pontosRecompensa,
        };
        this.#conquistas.push(row);
        return row;
    }

    async alterar(conquista) {
        const json = conquista.toJSON();
        const idx = this.#conquistas.findIndex(c => c.id == json.id);
        if (idx === -1) return null;
        this.#conquistas[idx] = { ...this.#conquistas[idx], nome: json.nome, descricao: json.descricao, meta_quantidade: json.metaQuantidade, pontos_recompensa: json.pontosRecompensa };
        return this.#conquistas[idx];
    }

    async deletar(conquista) {
        const json = conquista.toJSON();
        const idx = this.#conquistas.findIndex(c => c.id == json.id);
        if (idx === -1) return false;
        this.#conquistas.splice(idx, 1);
        return true;
    }

    async consultarTodos() {
        return this.#conquistas;
    }

    async consultarPorId(id) {
        return this.#conquistas.find(c => c.id == id) ?? null;
    }

    async consultarDesbloqueadasPorUsuario(usuarioId) {
        const links = this.#usuarioConquista.filter(uc => uc.usuario_id == usuarioId);
        return links.map(link => {
            const c = this.#conquistas.find(cq => cq.id === link.conquista_id);
            return { ...c, data_conquistada: link.data_conquistada };
        }).filter(Boolean);
    }
}

export { ConquistaDAO_InMemory };
export { ConquistaDAO_InMemory as ConquistaDAO_Postgres };
