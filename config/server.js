const express = require("express");
const https = require("https");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 443;

const pathToPrivateKey = process.env.PKEY_PATH || "/etc/credentials/privateKey.key";
const pathToCertificate = process.env.CERT_PATH || "/etc/credentials/certificate.crt";

const privateKey = fs.readFileSync(pathToPrivateKey, "utf8");
const cert = fs.readFileSync(pathToCertificate, "utf8");

const credentials = {
    key: privateKey,
    cert: cert
};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin (for development purposes)
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());

const httpsServer = https.createServer(credentials, app);

module.exports = { app, httpsServer, port };