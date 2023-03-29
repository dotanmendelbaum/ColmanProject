const loginService = require("../services/auth")

function isLoggedIn(req, res, next) {

    //check if the request includes a user
    if(req.session.user){
        return next()
    }
    //call the next function
    return res.redirect('/login')
}

function isAdmin(req, res, next) {
    //check if the request includes a user
    if(req.session.user){
        if(req.session.isAdmin)
        {
            return next()
        }
    }
    //call the next function
    return res.status
}

function homePage(req, res) {
    res.render("foo", {username: req.session.username})
}

function loginForm(req, res) { res.render("login/login", {}) }

function registerForm(req, res) { res.render("register/register", {}) }

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

async function login(req, res) {
    const { email, password } = req.body

    const result = await loginService.login(email, password)
    if (result) {
        req.session.user = email
        req.session.isAdmin = result.admin
        res.redirect('/')
    }
    else
        res.redirect('/login?error=1')
}

async function register(req, res) {
    const { username, password } = req.body


    try {
        await loginService.register(username, password)
        req.session.username = username
        res.redirect('/')
    }
    catch (e) {
        res.redirect('/register?error=1')
    }
}

module.exports = {
    login,
    loginForm,
    register,
    registerForm,
    logout,
    isAdmin,
    foo,
    isLoggedIn
}