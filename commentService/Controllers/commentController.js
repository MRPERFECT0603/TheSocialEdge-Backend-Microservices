const db = require("../Config/connectiondb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("../Models/postModel");
const User = require("../Models/userModel");

// const getComments = (req, res) => {

//     const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
//         WHERE c.postId = ? 
//         ORDER BY c.createdAt DESC`;

//     db.query(q, [req.query.postId], (err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.status(200).json(data);
//     })
// };



// const addComment = (req, res) => {

//     const token = req.cookies.accessToken;
//     if (!token)
//         return res.status(401).json("Not Logged In!!!");

//     jwt.verify(token, "secretKey", (err, UserInfo) => {
//         if (err) return res.status(403).json("Token is not valid!!!");

//         const q = "INSERT INTO comments(`desc` , `createdAt` , `userId` , `postId`) VALUES (?)";

//         const values = [
//             req.body.desc,
//             moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//             UserInfo.id,
//             req.body.postId
//         ];

//         db.query(q, [values], (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.status(200).json("Comment  has been Created!!!");
//         })
//     })

// };


const getComments = async (req, res) => {

    const postId = req.query.postId;
    try {
        const post = await Post.findOne({ _id: postId })
        console.log(post.like);
        const comments = post.comment.sort((a, b) => b.createdAt - a.createdAt);
        console.log(comments);
        res.json(comments);
        return;
    }
    catch (error) {
        console.error("Error Geting Likes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const addComments = async (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.token(401).json("Not Logged In!!!");

    const postId = req.query.postId;
    const comment  = req.body.comment;

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
        const Comment = {
            creatorId: userId, 
            comment: comment,
        }
        post.comment.push(Comment);
        await post.save();
        res.json(post);
    } catch (error) {
        console.error("Error Posting", error);
        res.status(500).json({ error: "Internal server error" });
    }

};


// const deleteLike = async (req, res) => {

//     const postId = req.query.postId;

//     const token = req.cookies.accessToken;
//     if (!token) return res.token(401).json("Not Logged In!!!");



//     try {
//         // Verify the token and get userId
//         const decoded = await jwt.verify(token, process.env.JWT_SECURITY);
//         console.log(decoded);
//         const userId = decoded.id;
//         console.log(userId);
//         // Proceed with updating the user
//         const post = await Post.findOne({ _id: postId })
//         if (!post) {
//             res.status(404).json({ error: "Post not Available!!" });
//             return;
//         }
//         if (!post.like.includes(userId)) {
//             res.json("Didn't Liked the post!!");
//             return;
//         }
//         post.like = post.like.filter(Id => Id !== userId);
//         await post.save();
//         res.json(post);
//     } catch (error) {
//         console.error("Error Posting", error);
//         res.status(500).json({ error: "Internal server error" });
//     }




// };



module.exports = { getComments, addComments }