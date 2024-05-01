// registerController.js

const express = require('express');
const router = express.Router();
const pool = require('../db/mysql'); 

exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const values = [username, password];

        connection.query(sql, values, (error, results, fields) => {
            connection.release();

            if (error) {
                console.error('Error registering user:', error);
                return res.status(500).json({ success: false, message: 'Error registering user' });
            }

            return res.status(201).json({ success: true, message: 'User registered successfully' });
        });
    });
};

// module.exports = router;
