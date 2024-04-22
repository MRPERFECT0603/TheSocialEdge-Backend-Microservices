const db = require("../Config/connectiondb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("../Models/postModel");
const User = require("../Models/userModel");
const { sendNotification } = require("../kafka/Producer");


// const getLikes = (req, res) => {

//     const q = "SELECT userId FROM likes WHERE postId = ?";

//     db.query(q, [req.query.postId], (err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.status(200).json(data.map(like => like.userId));
//     })
// };
const getLikes = async (req, res) => {

    const postId = req.query.postId;
    try {
        const post = await Post.findOne({ _id: postId })
        console.log(post.like);
        const NumberOfLikes = post.like.length;
        console.log(NumberOfLikes);
        res.json(NumberOfLikes);
        return;
    }
    catch (error) {
        console.error("Error Geting Likes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const addLike = async (req, res) => {


    const postId = req.query.postId;

    const token = req.cookies.accessToken;
    if (!token) return res.token(401).json("Not Logged In!!!");

    try {
        // Verify the token and get userId
        const decoded = await jwt.verify(token, process.env.JWT_SECURITY);
        console.log(decoded);
        const userId = decoded.id;
        console.log(userId);
        // Proceed with updating the user
        const post = await Post.findOne({ _id: postId })
        if (!post) {
            res.status(404).json({ error: "Post not Available!!" });
            return;
        }
        if (post.like.includes(userId)) {
            res.json("Already Liked the post!!");
            return;
        }
        post.like.push(userId);
        await post.save();
        const postOwner = await User.findOne({ _id: post.userId });
        console.log(postOwner);
        const userEmail = postOwner.email;
        const postLiker = await User.findOne({ _id: userId });
        const userName = postLiker.username;
        sendNotification(userEmail, userName);
        res.json(post);
    } catch (error) {
        console.error("Error Posting", error);
        res.status(500).json({ error: "Internal server error" });
    }

};


const deleteLike = async (req, res) => {

    const postId = req.query.postId;

    const token = req.cookies.accessToken;
    if (!token) return res.token(401).json("Not Logged In!!!");



    try {
        // Verify the token and get userId
        const decoded = await jwt.verify(token, process.env.JWT_SECURITY);
        console.log(decoded);
        const userId = decoded.id;
        console.log(userId);
        // Proceed with updating the user
        const post = await Post.findOne({ _id: postId })
        if (!post) {
            res.status(404).json({ error: "Post not Available!!" });
            return;
        }
        if (!post.like.includes(userId)) {
            res.json("Didn't Liked the post!!");
            return;
        }
        post.like = post.like.filter(Id => Id !== userId);
        await post.save();
        res.json(post);
    } catch (error) {
        console.error("Error Posting", error);
        res.status(500).json({ error: "Internal server error" });
    }




};



module.exports = { getLikes, addLike, deleteLike }