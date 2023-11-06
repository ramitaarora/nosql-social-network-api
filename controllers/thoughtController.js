const { Thought, User } = require('../models');

module.exports = {
    // GET to get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET to get a single thought by its _id
    async getSingleThought(req, res) {
        try {
            const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            
            if (!thoughts) {
                return res.status(404).json({ message: 'No thoughts with that ID'});
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.updateOne(
                { username: thought.username },
                { $push: { thoughts: [thought._id] }},
                { runValidators: true, new: true }
            )
            res.json({message: 'Thought created!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // PUT to update a thought by its _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!thought) {
                res.status(404).json({ message: 'No thought with this ID'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE to remove a thought by its _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId});

            if (!thought) {
                res.status(404).json({ message: 'No thought with this ID'});
            }

            const user = await User.updateOne(
                { username: thought.username },
                { $pullAll: {thoughts: [req.params.thoughtId]} },
                { new: true }
            )
            res.json({ message: 'Thought deleted.'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // POST to create a reaction stored in a single thought's reactions array field
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $push: { reactions: 
                    [
                        {
                            reactionBody: req.body.reactionBody,
                            username: req.body.username,
                        }
                    ]}},
                { runValidators: true, new: true}
            );
            if (!reaction) {
                return res.status(404).json({ message: 'No thoughts with that ID'});
            }
            res.json(reaction);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    // DELETE to pull and remove a reaction by the reaction's reactionId value
    async deleteReaction(req, res) {
        try {
            // const getReactionId = await Thought.findOne({ _id: req.params.thoughtId});
            // let returnedReactionId = getReactionId.reactions.map(item => item.reactionId);

            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: { reactions: {reactionId: req.body.reactionId}}},
                { new: true }
            );
            if (!reaction) {
                return res.status(404).json({ message: 'No thoughts with that ID'});
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}