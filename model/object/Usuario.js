/**
 * Model: Usuario
 * Representa um usuário do sistema MusicHorizon.
 */
export class Usuario {
    #id;
    #loginUsuario;
    #pontos;
    #lastfmUsername;
    #dataCadastro;
    #playlists;
    #conquistas;
    #historicos;

    constructor() {
        this.#id = null;
        this.#loginUsuario = null;
        this.#pontos = 0;
        this.#lastfmUsername = null;
        this.#dataCadastro = null;
        this.#playlists = [];
        this.#conquistas = [];
        this.#historicos = [];
    }

    // ── Setters ──────────────────────────────────────────────

    setId(id) {
        this.#id = id;
        return true;
    }

    setLoginUsuario(loginUsuario) {
        this.#loginUsuario = loginUsuario;
        return true;
    }

    setLastfmUsername(lastfmUsername) {
        this.#lastfmUsername = lastfmUsername;
        return true;
    }

    setDataCadastro(dataCadastro) {
        this.#dataCadastro = dataCadastro;
        return true;
    }

    // ── Getters ──────────────────────────────────────────────

    getId() {
        return this.#id;
    }

    getLoginUsuario() {
        return this.#loginUsuario;
    }

    getPontos() {
        return this.#pontos;
    }

    getLastFMUsername() {
        return this.#lastfmUsername;
    }

    getDataCadastro() {
        return this.#dataCadastro;
    }

    /**
     * Calcula o nível atual com base nos pontos acumulados.
     * Escala: 0=Nv1, 100=Nv2, 300=Nv3, 600=Nv4, 1000=Nv5
     */
    getNivelAtual() {
        const thresholds = [0, 100, 300, 600, 1000];
        let nivel = 1;
        for (let i = 0; i < thresholds.length; i++) {
            if (this.#pontos >= thresholds[i]) nivel = i + 1;
        }
        return nivel;
    }

    /** Retorna o título associado ao nível atual. */
    getTituloNivel() {
        const titulos = ['Iniciante', 'Explorador', 'Descobridor', 'Colecionador', 'Maestro'];
        return titulos[this.getNivelAtual() - 1] ?? 'Desconhecido';
    }

    /** Retorna quantos pontos faltam para o próximo nível. */
    getFaltamParaProximoNivel() {
        const thresholds = [0, 100, 300, 600, 1000];
        const nivel = this.getNivelAtual();
        if (nivel >= thresholds.length) return 0;
        return thresholds[nivel] - this.#pontos;
    }

    getQtdPlaylistsCriadas() {
        return this.#playlists.length;
    }

    getQtdMusicasDescobertas() {
        return this.#historicos.length;
    }

    // ── Métodos de negócio ───────────────────────────────────

    sumPontos(quantidade) {
        this.#pontos += quantidade;
        return true;
    }

    addPlaylist(playlist) {
        this.#playlists.push(playlist);
        return true;
    }

    addConquista(conquista) {
        this.#conquistas.push(conquista);
        return true;
    }

    addHistorico(historico) {
        this.#historicos.push(historico);
        return true;
    }

    /** Retorna representação JSON do objeto (usado pelo DAO). */
    toJSON() {
        return {
            id: this.#id,
            loginUsuario: this.#loginUsuario,
            pontos: this.#pontos,
            lastfmUsername: this.#lastfmUsername,
            dataCadastro: this.#dataCadastro,
            nivelAtual: this.getNivelAtual(),
            tituloNivel: this.getTituloNivel(),
            faltamParaProximoNivel: this.getFaltamParaProximoNivel(),
        };
    }
}
