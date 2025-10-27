const express = require('express');
const router = express.Router();

const pool = require('../db');
const { message } = require('statuses');
const e = require('cors');

router.post('/contact/submit', async (req, res) => {
    try {
        const { name, email, request } = req.body;

        const result = await pool.query(`
            INSERT INTO contact_form (name, email, request)
            VALUES ($1, $2, $3) RETURNING *`,
            [name, email, request]    
        );

        const savedForm = result.rows[0];

        res.status(201).json({
            message: `Thanks ${savedForm.name} for contacting me! I will get back to you ASAP!`,
            data: savedForm
        })
    } catch (error) {
        console.error('Erro submitting form', error);
        res.status(500).json({ message: 'Failed to submit form' });
    }
});

module.exports = router;