const speakEasy = require("speakeasy");

const verify = (secret, token) => {
    return speakEasy.totp.verify({
        secret,
        token,
        encoding: "base32"
    });
};

module.exports = { verify };