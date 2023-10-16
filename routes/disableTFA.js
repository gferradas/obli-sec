const express = require("express");
const router = express.Router();
const { dbConfig } = require("../config/database");
const mysql = require("mysql2/promise");
const { hashPassword } = require("../utils/cryptoUtils.js");


const path = "/disableTFA";

router.post(path, async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        res.status(400).json({ ok: false, message: "Invalid username or token" });
        return;
    }

    dbConfig.database = "users";

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [existingUser] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length === 1) {

            const { tfa, password: DB_PASS, salt } = existingUser[0];
            const hashedPassword = hashPassword(password, salt);
            if (hashedPassword !== DB_PASS) {
                res.status(401).json({ ok: false, message: "Authentication failed, wrong password" });
                return;
            }


            if (!tfa.tfa) {
                res.status(401).json({ ok: false, message: "2FA not enabled" });
                return;
            }

            await connection.execute("UPDATE users SET tfa = ? WHERE username = ?", [{ ...tfa, tfa: false }, username]);
            res.status(200).json({ ok: true, message: "2FA verified" });

        } else {
            res.status(409).json({ ok: false, message: "User doesn't exist" });
        }
        connection.end();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ ok: false, error: "Internal Server Error", errorMessage: err });
    }
});

module.exports = { router, path };
