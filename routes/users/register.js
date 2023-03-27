const express = require("express");
const router = express.Router();
const User = require("../../models/user");
//All Players Route

module.exports = (io) => {
    router.get('/', (req, res) => {
        res.render("register/index.ejs")
    })

    router.post('/', async (req, res) => {
        console.log("body: " + req.body.admin)
        const { name, email, id, date, phone, admin, password } = req.body;
        const isAdmin = admin.value === "on" ? true : false;
        //check if all the necessary data is given
        if(!name.length || !email.length || !password.length || !id.length || !date.length || !phone.length){
            res.json('fill all the fields');
        } else{
            try {
                //check if the user already exists
                const existingUser = await User.findOne({
                    $or: [{ email }, { id }, { phone }]
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

                res.status(200).json('User created successfully');
                res.redirect('login')

            } catch (error) {
                console.error(error);
                res.status(500).json('Server error');
            }
        }
    })
    return router;
};