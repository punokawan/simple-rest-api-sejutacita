const responseFormatter = require("../../helpers/responseFormatter");

module.exports = async (req, res, next)=>{
    try {
        const {user} = req.decodedToken;
        console.log({user});
        if (user.role !== 'admin') {
            return responseFormatter.methodNotAllowed({res})
        }
        return next();
    } catch (error) {
        return responseFormatter.error({res, message: error.message});
    }
}