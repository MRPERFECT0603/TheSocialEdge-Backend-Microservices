const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
    description: {
        type: String,
    },

    image: {
        type: String,

    },
    userId: {
        type: String,
    },

    comment: {
        type: [{
            creatorId: String,
            comment: String,
            createdAt: { type: Date, default: Date.now }
        }],
    },
    like: {
        type: [String],
    },

},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", PostSchema);