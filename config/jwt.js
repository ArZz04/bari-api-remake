const { JWT_SECRET } = require("./constants")

module.exports = {
    secret: JWT_SECRET,
    expiresIn: '1h', // Token expiration time
};
