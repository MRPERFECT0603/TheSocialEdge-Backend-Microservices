const db = require("../Config/connectiondb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Post = require("../Models/postModel");
const User = require("../Models/userModel");



async function Mail(email, name) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vivekshaurya77@gmail.com',
            pass: 'vddu hzlv xiaf ksbv',
        }
    });
    console.log(email, name);
    const mailOptions = {
        from: 'vivekshaurya77@gmail.com',
        to: [email],
        subject: 'SomeOne Liked your Post',
        text: `${name} liked your post`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}


const sendNotification = (req, res) => {
    console.log("body" + req.body);
    const { email, name } = req.body;
    Mail(email, name);
    res.status(200).json("Confirmation Mail Sent!!");
}

module.exports = { sendNotification }