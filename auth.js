const User = require("./models/user");
const {response} = require("express");

function authorize(req, res, next)
{
    if(req.session.user){
        console.log("auth")
        return next()
    }
    //call the next function
    res.redirect('/login')
}

function authAdmin(req, res, next)
{
    //check if the request includes a user
    if(req.session.user){
        if(req.session.isAdmin)
        {
            console.log("admin")
            return next()
        }
    }
    //call the next function
    return res.redirect('/flights')
}

module.exports = {
    authorize,
    authAdmin
}