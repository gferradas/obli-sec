const crypto = require("crypto");

const generateSalt = () => {
    return crypto.randomBytes(16).toString("hex");
};

const hashPassword = (password, salt) => {
    return crypto.createHash("sha256").update(password + salt).digest("hex");
};

module.exports = { generateSalt, hashPassword };