
const express = require('express');
const router = express.Router();
const { dbConfig } = require('../config/database');
const mysql = require('mysql2/promise');
const { generateSalt, hashPassword } = require('../utils/cryptoUtils');

const path = "/register";

router.post(path, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password || username.length < 2 || password.length < 8) {
        res.status(400).json({ ok: false, message: 'Invalid username or password' });
        return;
    }

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);
    dbConfig.database = 'users';

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [existingUser] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length !== 0) {
            connection.end();
            res.status(409).json({ ok: false, message: 'User already exists' });
            return;
        }

        await connection.execute('INSERT INTO users (username, salt, password, tfa) VALUES (?, ?, ?, ?)', [username, salt, hashedPassword, { secret: "", otpAuth: "", tfa: false }]);
        connection.end();
        res.json({ ok: true, message: 'Registration successful' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ ok: false, error: 'Internal Server Error', error: err });
    }
});

module.exports = { router, path };
