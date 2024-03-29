require('dotenv').config();
const jwt = require('jsonwebtoken');


const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;
const options = { expiresIn: '30 minutes'};
const refreshOptions = { expiresIn: '30 days'};

const generateJwt = (payload) => {
    return jwt.sign(payload, tokenPrivateKey, options);
}

const verifyJwt = (token) => {
    return jwt.verify(token, tokenPrivateKey);
};
const generateRefreshJwt = (payload) => {
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
}
const refreshVerifyJwt = (token) => {
    return jwt.verify(token, refreshTokenPrivateKey);
};



module.exports = { generateJwt, generateRefreshJwt}