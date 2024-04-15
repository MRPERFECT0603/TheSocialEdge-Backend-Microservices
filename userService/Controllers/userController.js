const db = require("../Config/connectiondb");
const jwt = require("jsonwebtoken");
const User = require("../Model/model");


const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}

const updateUser = async (req, res) => {
    const token = req.cookies.accessToken;
    console.log(token);
    if (!token) return res.status(401).json("Not Logged In!!!");

    try {
        // Verify the token and get userId
        const decoded = await jwt.verify(token, process.env.JWT_SECURITY);
        console.log(decoded);
        const userId = decoded.id;
        console.log(userId);
        // Proceed with updating the user

        const userData = req.body;
        console.log(userData);
        const updatedUser = await User.findByIdAndUpdate( userId,
            { $set: userData }, // Use $set to update existing fields and add new ones
            { new: true, upsert: true }
        );
        if (!updatedUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { getUser, updateUser };