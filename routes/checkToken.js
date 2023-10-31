const express = require("express");
const router = express.Router();
const { dbConfig } = require("../config/database");
const mysql = require("mysql2/promise");

const path = "/checkToken";

router.post(path, async (req, res) => {
    const { username, token } = req.body;

    if (!username || !token || username.length < 2) {
        res.status(400).json({ ok: false, message: "Invalid username or password" });
        return;
    }

    try {
        dbConfig.database = "users";
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
        await connection.end();

        if (rows.length !== 1) {
            connection.end();
            res.status(401).json({ ok: false, message: "Authentication failed", error: "01" });
            return;
        }

        if (token !== rows[0].password) {
            res.status(401).json({ ok: false, message: "Authentication failed, wrong password", error: "02" });
            return;
        }

        const { tfa } = rows[0];

        res.json({ ok: true, message: "Authentication successful", token, tfa });

    } catch (error) {
        console.log(error);
        res.status(401).json({ ok: false, message: "Authentication failed", error: error });
    }
});

module.exports = { router, path };
