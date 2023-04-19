const express= require('express')
const router = express.Router();
const accountPreferences = require('../controllers/accountPreferences');
const {validateUserData} = require("../services/accountPreferences")

const {authorize, authAdmin} = require("../auth");

module.exports = (io) => {

    router.route('/')
        .get(authorize, accountPreferences.getMyAccountPage)
        .put(authorize, validateUserData, accountPreferences.updateUserData)

    return router;
}
