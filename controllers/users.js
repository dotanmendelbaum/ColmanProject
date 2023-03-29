const user = require('../services/users')


const createUser = async (req, res)=>{

}

const getAllUsersPage = async (req,res) =>{
    const Users = await user.getAll()
    res.render('admin/users', {users: Users})
}

const updateUser = async (req, res) => {
    const updatedUser = {
        $set: {
            name: req.body.name,
            email: req.body.email,
            id: req.body.id,
            birthDate: req.body.birthDate,
            admin: req.body.admin
        }
    };
}

module.exports = {
    getAllUsersPage
};