const db = require("../Config/connectiondb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("../Models/postModel");
const User = require("../Models/userModel");


const getPosts = async (req, res) => {

    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!!!");
    try {
        // Verify the token and get userId
        const decoded = await jwt.verify(token, process.env.JWT_SECURITY);
        console.log(decoded);
        const userId = decoded.id;
        console.log(userId);
        // Proceed with updating the user
        const followingUsers = await User.findOne({ _id: userId });
        console.log(followingUsers);
        if (!followingUsers) return res.status(404).json("User Not Found!!");

        const posts = await Post.find({
            $or: [
                { userId: userId }, // Posts created by the user
                { userId: { $in: followingUsers.following } } // Posts by users followed by the user
            ]
        });

        if (!posts) return res.status(404).json("NO Post Found!!!");

        res.json(posts);

    } catch (error) {
        console.error("Error Geting Post", error);
        res.status(500).json({ error: "Internal server error" });
    }


};



const addPost = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.token(401).json("Not Logged In!!!");

    try {
        // Verify the token and get userId
        const decoded = await jwt.verify(token, process.env.JWT_SECURITY);
        console.log(decoded);
        const userId = decoded.id;
        console.log(userId);
        // Proceed with updating the user

        const postData = req.body;
        console.log(postData);

        const post = {
            description: postData.description,
            image: postData.image,
            userId: userId,
            comment: postData.comment || [],
            like: postData.like || []
        }
        const postCreated = await Post.create(post);
        if (!postCreated) {
            res.status(404).json({ error: "Post not Created!!" });
            return;
        }
        res.json(postCreated);
    } catch (error) {
        console.error("Error Posting", error);
        res.status(500).json({ error: "Internal server error" });
    }

};





//     const token = req.cookies.accessToken;
//     if (!token)
//         return res.token(401).json("Not Logged In!!!");

//     jwt.verify(token, "secretKey", (err, UserInfo) => {
//         if (err) return res.status(403).json("Token is not valid!!!");

//         const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";


//         db.query(q, [req.params.id, UserInfo.id], (err, data) => {
//             if (err) return res.status(500).json(err);
//             if (data.affectedRows > 0) return res.status(200).json("Post has been Deleted !!!");
//             return res.status(403).json("You can delete only your Post");
//         })
//     })


const deletePost = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.token(401).json("Not Logged In!!!");

    try {
        // Verify the token and get userId
        const decoded = await jwt.verify(token, process.env.JWT_SECURITY);
        console.log(decoded);
        const userId = decoded.id;
        console.log(userId);
        // Proceed with updating the user

        const postId = req.body.postId;
        console.log(postId);

        const deletePost = await Post.deleteOne({_id: postId , userId: userId});
        if (!deletePost) {
            res.status(404).json({ error: "Post not Created!!" });
            return;
        }
        res.json(deletePost);
    } catch (error) {
        console.error("Error Deleteing Post", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { getPosts, addPost, deletePost };