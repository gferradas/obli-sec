const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "choferes",
};

const createTableSQL = `
CREATE TABLE IF NOT EXISTS choferes (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
)
`;

const insertChoferesSQL = `
INSERT INTO choferes (name, image, price)
VALUES
  ('Carlos', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/1.webp', 500),
  ('Mario', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/2.webp', 600),
  ('Luis', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/3.webp', 450),
  ('Juan', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/4.webp', 700),
  ('Jose', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/5.webp', 550),
  ('Ricardo', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/6.webp', 800),
  ('Pedro', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/7.webp', 400),
  ('Jorge', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/8.webp', 750),
  ('Rafael', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/9.webp', 350),
  ('Fernando', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/10.webp', 900),
  ('Antonio', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/11.webp', 420),
  ('Miguel', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/12.webp', 680),
  ('Felipe', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/13.webp', 520),
  ('Andres', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/14.webp', 820),
  ('Luis', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/15.webp', 480),
  ('Gabriel', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/16.webp', 720),
  ('Eduardo', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/17.webp', 390),
  ('Alberto', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/18.webp', 670),
  ('David', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/19.webp', 550),
  ('Hector', 'https://raw.githubusercontent.com/gferradas/obli-sec/main/docs/images/20.webp', 950);
`;

const insertUserSQL = `
INSERT INTO users (username, salt, password, tfa)
VALUES
('admin', '618decb94bd8c6236ec0c4e484bc5266','393c37fa9ccd587ece942b31f8b6af20b9f662bafad566ffc69eb449aaf35169', "{}")
`;

const initializeDB = async () => {
    try {
        const db = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        };
        let connection = await mysql.createConnection(db);
        console.log("Connected to MySQL");
        connection.query("CREATE DATABASE IF NOT EXISTS choferes");
        connection.query("CREATE DATABASE IF NOT EXISTS users");
        connection.query("CREATE DATABASE IF NOT EXISTS pedidos");
        connection.end();

        db.database = "choferes";
        connection = await mysql.createConnection(db);
        connection.query(createTableSQL);
        connection.query("DELETE FROM choferes");
        connection.query(insertChoferesSQL);
        connection.end();

        db.database = "users";
        connection = await mysql.createConnection(db);
        connection.execute("DROP TABLE IF EXISTS users");
        connection.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, salt VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, tfa json)");
        connection.query(insertUserSQL);
        connection.end();

        db.database = "pedidos";
        connection = await mysql.createConnection(db);
        connection.query("CREATE TABLE IF NOT EXISTS pedidos (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, order_content TEXT NOT NULL, address_content TEXT NOT NULL)");
        connection.query("DELETE FROM pedidos");
        connection.end();


        console.log("Database initialized");
    } catch (error) {
        console.log(error);
        console.log("Error initializing database");
    }

};

module.exports = { dbConfig, initializeDB };