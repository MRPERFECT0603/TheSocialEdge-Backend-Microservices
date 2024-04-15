const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },

    username: {
        type: String,

    },
    email: {
        type: String,
    },

    password: {
        type: String,
    },


    coverPic: {
        type: String,
    },

    profilePic: {
        type: String,
    },

    city: {
        type: String,
    },

    website: {
        type: String,
    },

},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);