const express = require("express");
const router = express.Router();
const { dbConfig } = require("../config/database");
const mysql = require("mysql2/promise");


const path = "/checkout";

router.post("/checkout", async (req, res) => {
    const { order_content: orderContent, address_content: addressContent } = req.body;
    const { name, email, address, city } = addressContent;

    const noData = !orderContent || !addressContent || !name || !email || !address || !city;
    const invalidData = name.length < 2 || email.length < 2 || address.length < 2 || city.length < 2 || !email.includes("@gmail.com");

    if (noData || invalidData) {
        res.status(400).json({ ok: false, message: "Invalid data" });
        return;
    }

    try {
        dbConfig.database = "pedidos";
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute("INSERT INTO pedidos (username, order_content, address_content) VALUES (?, ?, ?)", [name, JSON.stringify(orderContent), JSON.stringify(addressContent)]);
        connection.end();
        res.json({ ok: true, message: "Order successful" });
    } catch (error) {
        console.log(error);
        res.status(401).json({ ok: false, errorMessage: "Error", error: error });
    }
});

module.exports = { router, path };
