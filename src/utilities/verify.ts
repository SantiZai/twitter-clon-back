import { pool } from '../db'
import { RowData } from '../interfaces/RowData'

export const verifyUser = async (id: number) => {
	try {
		const [rows] = await pool.promise().query('SELECT * FROM users WHERE id = ?', [id]) as RowData[]
		return rows.length > 0 
	} catch (e) {
		console.error(e)
	}
}