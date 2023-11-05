const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET a single user by its _id and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
                .select('-__v');
            
                if (!user) {
                    res.status(404).json({ message: 'No user found with that ID'})
                }

                res.json({user});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // POST a new user

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // PUT to update a user by its _id
    async updateUser(req, res) {
        try {
            const user = await User.updateOne(
                { _id: req.params.userId}, 
                { username: req.body.username}
            )
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE to remove user by its _id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId});

            if (!user) {
                res.status(404).json({ message: 'No user found with that ID'});
            }
            res.json({message: 'User deleted.'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}