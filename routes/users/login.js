const express = require("express");
const router = express.Router();
const User = require("../../models/user");

module.exports = (io) => {

    router.get('/', (req, res) => {
        res.render("login/index.ejs")
    })

    router.post('/',async (req, res) => {

        const {email, password } = req.body;
        //check if all the necessary data is given
        if(!email.length || !password.length){
            res.json('fill all the fields');
        } else{
            try {
                //check if the user already exists
                const existingUser = await User.findOne({
                    $and: [{ email },{ password }]
                });

                if (existingUser) {
                    req.session.isAdmin = existingUser.admin;
                    //set the session user to be the email
                    req.session.user = { email };
                    return res.status(200).redirect('/')
                }
                else{
                    return res.status(401).json('email or password are incorrect')
                }
                }
                catch (error) {
                console.error(error);
                res.status(500).json('Server error');
            }
            }
    })
    return router;
};
