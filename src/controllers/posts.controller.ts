import { RequestHandler } from 'express'
import { pool } from '../db'
import { RowData } from '../interfaces/RowData'

export const getPosts: RequestHandler = async (req, res) => {
	try {
		const [posts] = await pool.promise().query('SELECT * FROM posts') as RowData[]
		res.json(posts)
	} catch (e) {
		return res.status(500).json({ message: 'Something goes wrong' })
	}
}

export const getPost: RequestHandler = async (req, res) => {
	try {
		const [rows] = await pool.promise().query('SELECT * FROM posts WHERE id = ?', [req.params.id]) as RowData[]
		if (rows.length <= 0) return res.status(404).json({ message: 'Post not found' })
		res.json(rows[0])
	} catch (e) {
		return res.status(500).json({ message: 'Something goes wrong' })
	}
}

//export const createPost: RequestHandler = async (req, res) => {
//	try {
//		const { user_id, text } req.body
//	} catch (e) {
//		return res.status(500).json({ message: 'Something goes wrong' })
//	}
//}