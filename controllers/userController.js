const { User } = require('../models');

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
                { $set: req.body},
                { runValidators: true, new: true}
            )
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE to remove user by its _id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId});

            if (!user) {
                res.status(404).json({ message: 'No user found with that ID'});
            }
            res.json({ message: 'User deleted.' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // POST to add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const friend = await User.updateOne(
                { _id: req.params.userId},
                { $set: req.params.friendId},
                { runValidators: true, new: true}
            )
            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE to remove a friend from a user's friend list
    async deleteFriend(req, res) {
        try {
            const friend = await User.findOneAndDelete(
                { _id: req.params.userId },
                { $unset: req.params.friendId },
                { new: true}
            )
            res.json({ message: 'Friend deleted.' })
        } catch (err) {
            res.status(500).json(err);
        }
    }
}