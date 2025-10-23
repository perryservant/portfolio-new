const express = require('express');
const router = express.Router();

const pool = require('../db');
const { message } = require('statuses');

router.get('/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching projects', error);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
});

router.get('/project/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const existing = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
        if (existing.rowCount === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const result = existing.rows[0];

        res.json(result);
    } catch (error) {
        console.error('Error fetching project data', error);
        res.status(500).json({ message: 'Failed to fetch project data' });
    }
});

module.exports = router;