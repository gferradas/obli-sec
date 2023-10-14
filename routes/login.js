
const express = require('express');
const router = express.Router();
const { dbConfig } = require('../config/database');
const mysql = require('mysql2/promise');
const { hashPassword } = require('../utils/cryptoUtils');


const path = "/login";

router.post(path, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password || username.length < 2 || password.length < 8) {
        res.status(400).json({ ok: false, message: 'Invalid username or password' });
        return;
    }

    try {
        dbConfig.database = 'users';
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
        await connection.end();

        if (rows.length !== 1) {
            connection.end();
            res.status(401).json({ ok: false, message: 'Authentication failed' });
            return
        }

        const { salt, tfa } = rows[0];
        const hashedPassword = hashPassword(password, salt);
        if (hashedPassword !== rows[0].password) {
            res.status(401).json({ ok: false, message: 'Authentication failed, wrong password' });
            return;
        }


        if (tfa.tfa) {
            res.status(200).json({ ok: true, message: 'Authentication successful', tfa: true });
            return;
        }

        res.json({ ok: true, message: 'Authentication successful', tfa: false });


    } catch (error) {
        console.log(error);
        res.status(401).json({ ok: false, message: 'Authentication failed', error: error });
    }
})

module.exports = { router, path };
