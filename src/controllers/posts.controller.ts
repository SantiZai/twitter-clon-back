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

export const createPost: RequestHandler = async (req, res) => {
	try {
		const { user_id, text } = req.body
		await pool.promise().query('INSERT INTO posts (user_id, text) VALUES (?, ?)', [user_id, text]) as RowData[]
		res.status(200).json({ message: 'Post created' })
	} catch (e) {
		return res.status(500).json({ message: 'Something goes wrong' })
	}
}

export const updatePost: RequestHandler = async (req, res) => {
	try {
		const { text } = req.body
		const [result] = await pool.promise().query('UPDATE posts SET text = ?, date = CURRENT_TIMESTAMP WHERE id = ?', [text, req.params.id]) as RowData[]
		if (result.affectedRows === 0) return res.status(404).json({ message: 'Post not found' })
		res.status(200).json({ message: 'Post updated' })
	} catch (e) {
		return res.status(500).json({ message: 'Something goes wrong' })
	}
}

export const deletePost: RequestHandler = async (req, res) => {
	try {
		const [result] = await pool.promise().query('DELETE FROM posts WHERE id = ?', [req.params.id]) as RowData[]
		if (result.affectedRows === 0) return res.status(404).json({ message: 'Post not found' })
		res.status(200).json({ message: 'Post deleted successfully' })
	} catch (e) {
		return res.status(500).json({ message: 'Something goes wrong' })
	}
}