const User = require('../models/User')

const userService = {
    getAllUser: async ()=>{
        const data = await User.find({},'username role').exec();
        return data;
    },
    getUserByUsername: async (username)=>{
        const data = await User.findOne({username}).exec();
        return data;
    },
    getUserById: async (id)=>{
        const data = await User.findOne({_id: id},'username role').exec();
        return data;
    },
    addUser: async (dataUser)=>{
        const newUser = new User(dataUser);
        return newUser.save();
    },
    updateUserById: async ({id, dataUser})=>{
        const user = await User.findByIdAndUpdate(
            id,
            dataUser,
            { new: true},
        )
        return user;
    },
    deleteUserById: async (id)=>{
        const user = await User.findByIdAndDelete(
            id
        )
        console.log({user});
        return user;
    }
}

module.exports = userService;