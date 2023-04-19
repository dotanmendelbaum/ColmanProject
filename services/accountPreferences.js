const users= require('../models/user')

const validateUserData = async(res, req, next) =>{
    const user = user.findOne({email: res.body.email})
    if(req.body.email != req.session.user && user)
        return res.status(401).json("you naughty naughty! (in indian accent) why you trying to do harm?")
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
    console.log("found flight for update. gate: ", update.Gate)
    if(!updatedUser)
        return null

    return updatedUser
}

module.exports ={
    validateUserData,
    updateUserdata
}