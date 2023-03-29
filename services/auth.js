const User = require("../models/User");

async function login(email, password) {
    const user = await User.findOne({ email: email, password });
    return user
}


async function register(username, password) {

    const user = new User({
        _id: username,
        password
    });

    await user.save()
}

module.exports = { login, register }