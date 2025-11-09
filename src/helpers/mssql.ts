import sql from 'mssql';
import type { config as MSSQLConfig, ConnectionPool } from 'mssql';

let pool: sql.ConnectionPool | null = null;

function getDbConfig(): MSSQLConfig {
    return {
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        server: process.env.DB_SERVER || '',
        database: process.env.DB_NAME || '',
        options: {
            encrypt: true, // For Azure
            trustServerCertificate: true, // Change to false for production
        },
    };
}

export async function getMSSQLConnection(): Promise<sql.ConnectionPool> {
    if (pool && pool.connected) {
        return pool;
    }
    const dbConfig = getDbConfig();
    pool = await new sql.ConnectionPool(dbConfig).connect();
    return pool;
}

