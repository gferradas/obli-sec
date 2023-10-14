const speakEasy = require('speakeasy');
const QRCode = require('qrcode');


const generateSecret = () => {
    return speakEasy.generateSecret({
        name: "Tienda-Obli"
    });
};

const generateQR = async (secret) => {
    try {
        return await QRCode.toDataURL(secret);
    } catch (error) {
        console.error(error);
    }
};

module.exports = { generateQR, generateSecret };