const user = require('../services/users')
const Users = require('../models/user')

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

const getUsersByAge = async (req, res) => {
    try {
        const usersByAgeRange = await Users.aggregate([
            {
                $addFields: {
                    age: {
                        $floor: {
                            $divide: [
                                { $subtract: [new Date(), '$birthDate'] },
                                1000 * 60 * 60 * 24 * 365.25,
                            ],
                        },
                    },
                },
            },
            {
                $bucket: {
                    groupBy: '$age',
                    boundaries: Array.from({ length: 21 }, (_, i) => i * 5),
                    default: '100+',
                    output: {
                        count: { $sum: 1 },
                    },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);
        console.log(usersByAgeRange)
        res.json(usersByAgeRange);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the data.' });
    }
}

module.exports = {
    getUsersByAge,
    getAllUsersPage
};