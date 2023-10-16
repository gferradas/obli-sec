const express = require("express");
const router = express.Router();
const { dbConfig } = require("../config/database");
const mysql = require("mysql2/promise");


const path = "/checkout";

router.post("/checkout", async (req, res) => {
    const { order_content, address_content } = req.body;
    const { name, email, address, city, state, zip } = address_content;

    if (!order_content || !address_content || !name || !email || !address || !city || !state || !zip || name.length < 2 || email.length < 2 || address.length < 2 || city.length < 2 || state.length < 2 || zip.length < 2) {
        res.status(400).json({ ok: false, message: "Invalid data" });
        return;
    }

    try {
        dbConfig.database = "pedidos";
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute("INSERT INTO pedidos (username, order_content, address_content) VALUES (?, ?, ?)", [name, JSON.stringify(order_content), JSON.stringify(address_content)]);
        connection.end();
        res.json({ ok: true, message: "Order successful" });
    } catch (error) {
        console.log(error);
        res.status(401).json({ ok: false, errorMessage: "Error", error: error });
    }
});

module.exports = { router, path };
