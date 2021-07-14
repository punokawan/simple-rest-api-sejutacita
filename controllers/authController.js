const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const responseFormatter = require('../helpers/responseFormatter');
const {
    createToken,
    createRefreshToken,
    saveRefreshToken,
    getUserByRefreshToken
} = require('../services/tokenService');
const userService = require('../services/userService');

const AuthController = {
    login: async (req, res, next) => {
        try {
            const { username='', password='' } = req.body;

            if (!username) {
                return responseFormatter.badRequest({res, message: 'username tidak boleh kosong'})
            }
            if (!password) {
                return responseFormatter.badRequest({res, message: 'password tidak boleh kosong'})
            }

            const user = await userService.getUserByUsername(username);
            
            if(!user){
                return responseFormatter.notFound({res, message: 'User not found'});
            }

            const isValidPassword = await bcrypt.compareSync(
                password,
                user.password
            );

            if (!isValidPassword) {
                return responseFormatter.badRequest({res, message: 'Password invalid'})
            }

            const accessToken = await createToken(user);
            const refreshToken = await createRefreshToken(user);

            const insertRefreshToken = await saveRefreshToken(user.id, refreshToken);

            const data = {
                accessToken,
                refreshToken,
            };

            return responseFormatter.success({res, message:'berhasil login', data: data});
        } catch (error) {
            return responseFormatter.error({res, message: error.message});
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            
            if(!refreshToken){
                return responseFormatter.badRequest({res, message: 'Access denied, refresh token missing!'})
            }

            const checkToken = await getUserByRefreshToken(refreshToken);

            if(!checkToken){
                return responseFormatter.unauthorized({res, message: 'Token expired!'})
            }

            const payload = jwt.verify(
                checkToken.refresh_token,
                process.env.JWT_SECRET_REFRESH_TOKEN
            );

            const accessToken = await createToken(checkToken);

            const data = {
                accessToken
            }

            return responseFormatter.success({res, message:'berhasil mendapatkan accessToken', data});

        } catch (error) {
            return responseFormatter.error({res, message: error.message});
        }

    }
}

module.exports = AuthController;