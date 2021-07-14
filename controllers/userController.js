const bcrypt = require('bcrypt');
const saltRounds = 10;

const userService = require('../services/userService');
const responseFormatter = require('../helpers/responseFormatter')

const userController = {
    getAllUser: async (req, res, next) => {
        try {
            const users = await userService.getAllUser();

            return responseFormatter.success({res, data: users, message: 'Berhasil Mendapatkan data'});
        } catch (error) {
            return responseFormatter.error({res, message: error.message});
        }
    },
    getUser: async (req, res, next)=>{
        try {
            const {username} = req.decodedToken.user;
            const user = await userService.getUserByUsername(username);

            const data = user

            return responseFormatter.success({res, data, message: 'Berhasil Mendapatkan data'});
        } catch (error) {
            return responseFormatter.error({res, message: error.message});
        }
    },
    getUserById: async (req, res, next)=>{
        try {
            const {id} = req.params;
            const user = await userService.getUserById(id);
            
            if(user){
                return responseFormatter.success({res, data: user, message: 'Berhasil Mendapatkan user'});
            }
            
            return responseFormatter.notFound({res});
        } catch (error) {
            return responseFormatter.error({res, message: error.message});
        }
    },
    addUser: async (req, res, next)=>{
        try {
            const {
                username,
                password,
                role,
            } = req.body;
            
            const dataUser = {
                username,
                password: bcrypt.hashSync(password, saltRounds),
                role,
            }
            console.log({dataUser});

            const user = await userService.getUserByUsername(username);
            if (user){
                return responseFormatter.badRequest({res, message: 'username has taken'})
            }

            const users = await userService.addUser(dataUser);

            return responseFormatter.success({res, data: users, message: 'Berhasil Menambah user', code: 201, status: 'CREATED'});
        } catch (error) {
            return responseFormatter.error({res, message: error.message});
        }
    },
    updateUser: async (req, res, next)=>{
        try {
            const {id} = req.params;
            const {
                username='',
                password='',
                role='',
            } = req.body;
            console.log(req.body);

            const dataUser = {}

            username? dataUser.username = username : '';
            password? dataUser.password = bcrypt.hashSync(password, saltRounds) : '';
            (role === 'user' || role === 'admin')? dataUser.role = role : '';

            const findUserById = await userService.getUserById(id);

            const findUserByUsername = await userService.getUserByUsername(username);
            
            if (findUserByUsername && findUserById.username != username){
                return responseFormatter.badRequest({res, message: 'username has taken'})
            }

            const users = await userService.updateUserById({id, dataUser});
            console.log({users});

            return responseFormatter.success({res, data: users, message: 'Berhasil Memperbarui User', code: 200});
        } catch (error) {
            return responseFormatter.error({res, message: error.message});
        }
    },
    deleteUser: async (req, res, next)=>{
        try {
            const {id} = req.params;
            
            const findUserById = await userService.getUserById(id);
            if (!findUserById){
                return responseFormatter.notFound({res, message: 'User not found'});
            }
            const user = await userService.deleteUserById(id);

            return responseFormatter.success({res, data: user, message: 'Berhasil Menghapus User', code: 200});
        } catch (error) {
            return responseFormatter.error({res, message: error.message});
        }
    }
}

module.exports = userController;