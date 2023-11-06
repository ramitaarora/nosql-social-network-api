const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1, 'Must be in between 1 and 280 characters'],
            max: [280, 'Must be in between 1 and 280 characters'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => `${createdAt.toLocaleDateString('en-US')} at ${createdAt.toLocaleTimeString('en-US')}`,
        },
        username: {
            type: String,
            required: true,
            ref: 'user',
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount')
.get(() => {
    return this.reactions? this.reactions.length : 0;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
