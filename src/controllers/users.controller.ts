import { RequestHandler } from 'express'
import { pool } from '../db'

export interface RowData {
    [ key: string ]: any
}

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const [users] = await pool.promise().query('SELECT * FROM users') as RowData[]
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const getUser: RequestHandler = async (req, res) => {
	try {
		const [rows] = await pool.promise().query('SELECT * FROM users WHERE id = ?', [req.params.id]) as RowData[]
		if (rows.length <= 0) return res.status(404).json({ message: 'User not found' })
		res.json(rows[0])
	} catch (e) {
		res.status(500).json({ message: 'Something goes wrong' })
	}
}

export const createUser: RequestHandler = async (req, res) => {
	try {
		const { user, password } = req.body
		await pool.promise().query('INSERT INTO users (user, password) VALUES (?, ?)', [user, password]) as RowData[]
		res.status(200).json({ message: 'User created' })
	} catch (e) {
		res.status(500).json({ message: 'Something goes wrong' })
	}
}

export const updateUser: RequestHandler = async (req, res) => {
	try {
		const id = req.params.id
		const { user, password, followeds } = req.body
		const [result] = await pool.promise().query('UPDATE users SET user = IFNULL(?, user), password = IFNULL(?, password), followeds = IFNULL(?, followeds) WHERE id = ?', [user, password, followeds, id]) as RowData[]
		if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' })
			res.status(200).json({ message: 'User updated' })
	} catch (e) {
		res.status(500).json({ message: 'Something goes wrong' })
	}
}

export const deleteUser: RequestHandler = async (req, res) => {
	try {
		const id = req.params.id
		const [result] = await pool.promise().query('DELETE FROM users WHERE id = ?', [id]) as RowData[]
		if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' })
			res.status(200).json({ message: 'User deleted successfully' })
	} catch (e) {
		res.status(500).json({ message: 'Something goes wrong' })
	}
}

//TODO create a function for implement verifications
export const followUser: RequestHandler = async (req, res) => {
	try {
		const id = req.params.id
		const [rows] = await pool.promise().query('SELECT * FROM users WHERE id = ?', [id]) as RowData[]
		if (rows.length <= 0) return res.status(404).json({ message: 'User not found' })
		let { followeds } = rows[0]
		const arrFollows = followeds.split(',')
		const newFollow = req.params.fol
		const userExists = await verifyUser(Number(newFollow))
		if(Number(id) === Number(newFollow)) return res.status(409).json({ message: 'This is the same user' })
		if (!userExists) return res.status(400).json({ message: 'User not found' })
		if (arrFollows.includes(newFollow)) {
			return res.status(409).json({ message: 'This user is already followed' })
		}
		followeds += ',' + newFollow
		const [result] = await pool.promise().query('UPDATE users SET followeds = ? WHERE id = ?', [followeds, id]) as RowData[]
		if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' })
			res.status(200).json({ message: 'User updated' })
	} catch (e) {
		res.status(500).json({ message: 'Something goes wrong' })
	}
}

const verifyUser = async (id: number) => {
	try {
		const [rows] = await pool.promise().query('SELECT * FROM users WHERE id = ?', [id]) as RowData[]
		return rows.length > 0 
	} catch (e) {
		console.error(e)
	}
}