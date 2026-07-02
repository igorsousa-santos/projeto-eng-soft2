/**
 * Model: Conquista
 * Representa uma conquista/badge do sistema de gamificação.
 */
export class Conquista {
    #id;
    #nome;
    #descricao;
    #metaQuantidade;
    #pontosRecompensa;
    #dataConquistada;

    constructor() {
        this.#id = null;
        this.#nome = null;
        this.#descricao = null;
        this.#metaQuantidade = 0;
        this.#pontosRecompensa = 0;
        this.#dataConquistada = null;
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

    setDescricao(descricao) {
        this.#descricao = descricao;
        return true;
    }

    setMetaQuantidade(metaQuantidade) {
        this.#metaQuantidade = metaQuantidade;
        return true;
    }

    setPontosRecompensa(pontosRecompensa) {
        this.#pontosRecompensa = pontosRecompensa;
        return true;
    }

    setDataConquistada(dataConquistada) {
        this.#dataConquistada = dataConquistada;
        return true;
    }

    // ── Getters ──────────────────────────────────────────────

    getNome() {
        return this.#nome;
    }

    getDescricao() {
        return this.#descricao;
    }

    getMetaQuantidade() {
        return this.#metaQuantidade;
    }

    getPontosRecompensa() {
        return this.#pontosRecompensa;
    }

    getDataConquistada() {
        return this.#dataConquistada;
    }

    /**
     * Verifica se a quantidade atual atende à meta desta conquista.
     * @param {number} quantidadeAtual
     * @returns {boolean}
     */
    verificarElegibilidade(quantidadeAtual) {
        return quantidadeAtual >= this.#metaQuantidade;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            descricao: this.#descricao,
            metaQuantidade: this.#metaQuantidade,
            pontosRecompensa: this.#pontosRecompensa,
            dataConquistada: this.#dataConquistada,
        };
    }
}
