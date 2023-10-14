const express = require('express');
const router = express.Router();
const { dbConfig } = require('../config/database');
const mysql = require('mysql2/promise');
const { generateQR } = require("../utils/create2fa.js");
const { hashPassword } = require("../utils/cryptoUtils.js");
const { generateSecret } = require("../utils/create2fa.js");

const path = "/requestQr";

router.post(path, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password || username.length < 2 || password.length < 8) {
        res.status(400).json({ ok: false, message: 'Invalid username or password' });
        return;
    }


    dbConfig.database = 'users';

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [existingUser] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser.length !== 1) {
            connection.end();
            res.status(409).json({ ok: false, message: "User doesn't exist" });
            return;
        }


        const { salt, tfa } = existingUser[0];
        const hashedPassword = hashPassword(password, salt);
        if (hashedPassword !== existingUser[0].password) {
            res.status(401).json({ ok: false, message: 'Authentication failed, wrong password' });
            return;
        }

        if (tfa.tfa) {
            res.status(401).json({ ok: false, message: 'Already have 2fa enabled', tfa: true });
            return;
        }


        const { base32: secret, otpauth_url: otpAuth } = generateSecret();
        await connection.execute('UPDATE users SET tfa = ? WHERE username = ?', [{ ...tfa, secret, otpAuth }, username]);
        connection.end();
        const qr = await generateQR(otpAuth);

        res.status(200).json({ ok: true, qr });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ ok: false, error: 'Internal Server Error', error: err });
    }
});

module.exports = { router, path };
