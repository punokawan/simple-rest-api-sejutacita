const User = require('../models/User')

const userService = {
    /* Get all users */
    getAllUser: async ()=>{
        const data = await User.find({},'username role').exec();
        return data;
    },
    /* Get user by username */
    getUserByUsername: async (username)=>{
        const data = await User.findOne({username}).exec();
        return data;
    },
    /* Get user by id */
    getUserById: async (id)=>{
        const data = await User.findOne({_id: id},'username role').exec();
        return data;
    },
    /* Add user */
    addUser: async (dataUser)=>{
        const newUser = new User(dataUser);
        return newUser.save();
    },
    /* update user by id */
    updateUserById: async ({id, dataUser})=>{
        const user = await User.findByIdAndUpdate(
            id,
            dataUser,
            { new: true},
        )
        return user;
    },
    /* delete user by id */
    deleteUserById: async (id)=>{
        const user = await User.findByIdAndDelete(
            id
        )
        console.log({user});
        return user;
    },
}

module.exports = userService;