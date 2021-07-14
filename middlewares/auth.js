const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const responseFormatter = require("../helpers/responseFormatter");

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return responseFormatter.badRequest({res, message: 'Token Authorization required!'})
        }

        const authHeader = req.headers.authorization.split(' ');

        if (!(authHeader[0] === 'bearer' || authHeader[0] === 'Bearer')) {
            return responseFormatter.badRequest({res, message: 'bearer token must be provided'})
        }
        const token = authHeader[1];

        jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
            if (err) {
              return responseFormatter.unauthorized({res, message: err.message});
            }
      
            req.decodedToken = decodedToken;
            return next();
          });
    } catch (error) {
        return responseFormatter.error({res, message: error.message});
    }
}