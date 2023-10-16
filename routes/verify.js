
const express = require("express");
const router = express.Router();
const { dbConfig } = require("../config/database");
const mysql = require("mysql2/promise");
const { verify } = require("../utils/verify");

const path = "/verify";

router.post(path, async (req, res) => {
    const { username, token } = req.body;

    if (!username || !token) {
        res.status(400).json({ ok: false, message: "Invalid username or token" });
        return;
    }

    dbConfig.database = "users";

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [existingUser] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length !== 1) {
            connection.end();
            res.status(409).json({ ok: false, message: "User doesn't exist" });
            return;
        }

        const { tfa } = existingUser[0];
        const { secret } = tfa;

        if (!secret) throw new Error("Secret not found");

        const verified = verify(secret, token);

        if (!verified) {
            connection.end();
            res.status(401).json({ ok: false, message: "Invalid token" });
            return;
        }

        await connection.execute("UPDATE users SET tfa = ? WHERE username = ?", [{ ...tfa, "tfa": true }, username]);
        res.status(200).json({ ok: true, message: "2FA verified" });
        connection.end();

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ ok: false, error: "Internal Server Error", errorMessage: err });
    }
});

module.exports = { router, path };
