const user =  require('../models/user')
const User = require("../models/user");

const createUser = async(req, res, next) => {
    const {name, email, id, date, phone, admin, password} = req.body;

    const isAdmin = admin
    //check if all the necessary data is given
    if (!name.length || !email.length || !password.length || !id.length || !date.length || !phone.length) {
        res.json('fill all the fields');
    } else {
        try {
            //check if the user already exists
            const existingUser = await User.findOne({
                $or: [{email}, {id}, {phone}]
            });

            if (existingUser) {
                // a user with the given email / Id / phone number already exists, return a 409 status code which indicates that there was a conflict in the data
                return res.status(409).json('Email / Id / phone are already in use');
            }
            // if the user does not already exist, add it to the database
            const newUser = new User({
                name: name,
                email: email,
                id: id,
                birthDate: date,
                phone: phone,
                admin: isAdmin,
                password: password
            })

            //save the new user in the database
            await newUser.save();
            //send the user to the login page:

            return res.status(200).next();
            //res.redirect('/login')

        } catch (error) {
            console.error(error);
            return res.status(500).json('Server error');
        }
    }
}
const deleteUser= async(id)=>
{
    const deletedUser = await user.findById(id)
    if(!deletedUser)
        return null

    await deletedUser.remove()
    return deletedUser
}

const updateUser=async(id, updatedUser)=>
{
}

const getAll = async()=>{
    return await user.find({})
}
module.exports =
    {
        createUser,
        deleteUser,
        getAll
    }