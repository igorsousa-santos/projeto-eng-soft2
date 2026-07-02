/**
 * config.js – Configuração polimórfica central do MusicHorizon API
 *
 * Define qual implementação concreta será carregada em cada camada.
 * Para trocar uma implementação, basta alterar o valor da chave correspondente.
 *
 * Exemplo: trocar para um DAO em memória para testes:
 *   IUsuarioDAO: 'UsuarioDAO_InMemory.js'
 */
const config = {
    // ── Routes ──────────────────────────────────────────────
    IRoutesUsuario:      'RoutesUsuario.js',
    IRoutesConquista:    'RoutesConquista.js',
    IRoutesPlaylist:     'RoutesPlaylist.js',
    IRoutesRecomendacao: 'RoutesRecomendacao.js',

    // ── Controllers ─────────────────────────────────────────
    IUsuarioController:      'UsuarioController.js',
    IConquistaController:    'ConquistaController.js',
    IPlaylistController:     'PlaylistController.js',
    IRecomendacaoController: 'RecomendacaoController.js',

    // ── DAOs ────────────────────────────────────────────────
    IUsuarioDAO:   'UsuarioDAO_Postgres.js',
    IConquistaDAO: 'ConquistaDAO_Postgres.js',
    IPlaylistDAO:  'PlaylistDAO_Postgres.js',
    IMusicaDAO:    'MusicaDAO_Postgres.js',

    // ── Services ────────────────────────────────────────────
    ISpotifyService: 'SpotifyService.js',
};

export default config;
