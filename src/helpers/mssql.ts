import sql from 'mssql';
import type { config as MSSQLConfig, ConnectionPool } from 'mssql';

let pool: sql.ConnectionPool | null = null;

/**
 * Retrieves MSSQL database configuration from environment variables.
 * @returns MSSQL config object used for establishing a connection.
 */
function getDbConfig(): MSSQLConfig {
    return {
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        server: process.env.DB_SERVER || '',
        database: process.env.DB_NAME || '',
        options: {
            encrypt: false, // Set to true for Azure with proper hostname
            trustServerCertificate: true,
            enableArithAbort: true,
        },
    };
}

/**
 * Provides a shared MSSQL connection pool instance.
 * Reuses an active pool if available, otherwise creates a new one.
 *
 * @returns Active SQL ConnectionPool instance.
 */
export async function getMSSQLConnection(): Promise<sql.ConnectionPool> {
    if (pool && pool.connected) {
        return pool;
    }
    const dbConfig = getDbConfig();
    pool = await new sql.ConnectionPool(dbConfig).connect();
    return pool;
}

