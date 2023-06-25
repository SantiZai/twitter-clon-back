import { createPool } from 'mysql2'
import { 
    DB_PORT,
    DB_DATABASE,
    DB_PASSWORD,
    DB_HOST,
    DB_USER
} from './config'

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
    database: DB_DATABASE,
})