const users = require("../models/user")
const service = require("../services/accountPreferences")
getMyAccountPage = async (req, res) => {
    const usr = await users.findOne({email: req.session.user.email})
    if(usr)
        res.render("account/accountPreferences.ejs", {user: usr})
}

updateUserData = async (req, res, io) => {
    const user = await service.updateUserdata(req, res);
    if(!user)
        return res.status(500)
    res.status(200).json(user)

    io.emit("user updated", user)
}
module.exports = {
    getMyAccountPage,
    updateUserData
}