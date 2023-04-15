const User = require("./models/user");
const {response} = require("express");

function authorize(req, res, next)
{
    if(req.session.user){
        console.log("auth")
        return next()
    }
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
    console.log("notAdmin")
    //call the next function
    return res.redirect('/flights')
}

module.exports = {
    authorize,
    authAdmin
}