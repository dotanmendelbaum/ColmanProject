const users= require('../models/user')

const validateUserData = async(req, res, next) =>{
    const user = await  users.findOne({email: req.body.email})
    console.log(req.session.user.email)
    if(req.body.email != req.session.user.email && user)
        return res.status(401).json("you naughty naughty! (in indian accent) why you trying to do harm?")
    console.log("user data")
    next()
}

const updateUserdata=async(req, res)=>
{
    const update = {
        name: req.body.name,
        email: req.body.email,
        id: req.body.id,
        birthDate: req.body.birthDate,
        phone: req.body.phone,
        password: req.body.password
    }

    const updatedUser = await users.findOneAndUpdate({email: req.session.user.email}, update)
    const currentUser = await users.findOne({email: req.session.user.email})
    console.log("found user for update: ", updatedUser)
    if(!currentUser)
        return null

    return currentUser
}

module.exports ={
    validateUserData,
    updateUserdata
}