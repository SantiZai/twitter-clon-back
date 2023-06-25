import { RequestHandler } from 'express'
import { pool } from '../db'

export interface RowData {
    [ key: string ]: any
}

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const [users] = await pool.promise().query('SELECT * FROM user') as RowData[]
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const getUser: RequestHandler = async (req, res) => {
	try {
		const [rows] = await pool.promise().query('SELECT * FROM user WHERE id = ?', [req.params.id]) as RowData[]
		if (rows.length <= 0) return res.status(404).json({ message: 'User not found' })
			res.json(rows[0])
	} catch (e) {
		res.status(500).json({ message: 'Something goes wrong' })
	}
}

export const createUser: RequestHandler = async (req, res) => {
	try {
		const { user, password } = req.body
		await pool.promise().query('INSERT INTO user (user, password) VALUES (?, ?)', [user, password]) as RowData[]
		res.status(200).json({ message: 'User created' })
	} catch (e) {
		res.status(500).json({ message: 'Something goes wrong' })
	}
}

export const updateUser: RequestHandler = async (req, res) => {
	try {
		const id = req.params.id
		const { user, password } = req.body
		const [result] = await pool.promise().query('UPDATE user SET user = IFNULL(?, user), password = IFNULL(?, password) WHERE id = ?', [user, password, id]) as RowData[]
		if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' })
			res.status(200).json({ message: 'User updated' })
	} catch (e) {
		res.status(500).json({ message: 'Something goes wrong' })
	}
}

export const deleteUser: RequestHandler = async (req, res) => {
	try {
		const id = req.params.id
		const [result] = await pool.promise().query('DELETE FROM user WHERE id = ?', [id]) as RowData[]
		if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' })
			res.status(200).json({ message: 'User deleted successfully' })
	} catch (e) {
		res.status(500).json({ message: 'Something goes wrong' })
	}
}