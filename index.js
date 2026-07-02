import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log('');
    console.log('MusicHorizon API');
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('');
    console.log('Endpoints disponíveis:');
    console.log('  POST   /usuario');
    console.log('  GET    /usuario');
    console.log('  GET    /usuario/lastfm/:username');
    console.log('  GET    /usuario/:id');
    console.log('  PUT    /usuario/:id');
    console.log('  DELETE /usuario/:id');
    console.log('  POST   /usuario/:id/vincular-spotify');
    console.log('  GET    /conquista/usuario/:id');
    console.log('');
});
