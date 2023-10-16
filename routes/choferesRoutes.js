const express = require("express");
const router = express.Router();
const { dbConfig } = require("../config/database");
const mysql = require("mysql2/promise");

const path = "/choferes";

router.get(path, async (req, res) => {
    try {
        dbConfig.database = "choferes";
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT * FROM choferes");
        await connection.end();
        res.status(200).json(rows);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ ok: false, error: "Internal Server Error", errorMessage: err });
    }
});

module.exports = { router, path };
