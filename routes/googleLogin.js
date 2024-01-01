const express = require("express");
const router = express.Router();
const { dbConfig } = require("../config/database");
const mysql = require("mysql2/promise");


const path = "/googleLogin";

router.post(path, async (req, res) => {
    const { username } = req.body;

    if (!username || username.length < 2) {
        res.status(400).json({ ok: false, message: "Invalid username" });
        return;
    }

    if (!username.includes("@gmail.com")) {
        res.status(400).json({ ok: false, message: "Username is invalid: it not type email" });
        return;
    }

    try {
        dbConfig.database = "users";
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
        await connection.end();

        if (rows.length !== 1) {
            connection.end();
            res.status(401).json({ ok: false, message: `Username ${username} does not exist` });
            return;
        }

        const { password, tfa } = rows[0];


        if (tfa.tfa) {
            res.status(200).json({ ok: true, message: "Authentication successful", tfa: true, token: password });
            return;
        }

        res.status(200).json({ ok: true, message: "Authentication successful", tfa: false, token: password });

    } catch (error) {
        console.log(error);
        res.status(401).json({ ok: false, message: "Authentication failed", error: error });
    }
});

module.exports = { router, path };
