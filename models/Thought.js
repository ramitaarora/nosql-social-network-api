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
            default: Date.now(),
            // TO DO: Use a getter method to format the timestamp on query
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

thoughtSchema.virtual('reactionCount')
.get(() => {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
