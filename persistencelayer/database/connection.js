import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

/**
 * Pool de conexão com o banco de dados PostgreSQL.
 * Utiliza a variável de ambiente DATABASE_URL definida no .env.
 */
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
    console.error('[DB] Erro inesperado no pool de conexão:', err);
});

export default pool;
