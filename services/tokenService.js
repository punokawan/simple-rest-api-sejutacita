const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports.createToken = (data) => {
    const {_id, username, role} = data;
    return jwt.sign(
        { 
            user: {
                _id, 
                username,
                role
            }
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED
        }
    );
}

module.exports.createRefreshToken = (data) => {
    const {_id} = data;
    return jwt.sign(
        { 
            user: {
                _id
            }
        },
        process.env.JWT_SECRET_REFRESH_TOKEN,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED
        }
    );
}

module.exports.saveRefreshToken = async (id, refreshToken) => {
    try {
        const updateRefreshToken = await User.findByIdAndUpdate(
            id,
            {refresh_token: refreshToken},
            { new: true},
        )
        console.log({updateRefreshToken});
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.getUserByRefreshToken = async (refreshToken) => {
    const data = await User.findOne(
            {refresh_token: refreshToken}
        ).exec();
        return data;
}