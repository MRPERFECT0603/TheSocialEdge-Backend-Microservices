const db = require("../Config/connectiondb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");


const register = async (req, res) => {
    const { username, email, password, name } = req.body;
    console.log(req.body);
    //To check if the Username or password is present before 
    //Username
    const Username = await User.find({ username: username }).count();
    if (Username > 0) {
        res.status(500).json("Username Exists, Please Choose Another Username!");
        return;
    }
    //Email
    const Email = await User.find({ email: email }).count();
    if (Email > 0) {
        res.status(500).json("Email Exists, Please Choose Another Email!");
        return;
    }
    //If Everything looks good add the data in the database 
    else {
        //hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const Data = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            coverPic: "",
            profilePic: "",
            city: "",
            website: "",
            following: ""
        }
        try {
            const createUser = await User.create(Data);
            res.status(200).json("User has been Created!");

        }
        catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

}


const login = async (req, res) => {
    console.log(req.body);

    let result = await User.find({ username: req.body.username });
    if (!result) {
        res.status(500).json("User Doesn't Exist!");
    }
    else {
        result = await User.findOne({ username: req.body.username })
    }
    console.log(result);
    const checkPassword = bcrypt.compareSync(req.body.password, result.password);


    if (!checkPassword)
        return res.status(400).json("Wrong Username or Password!!!");

    const token = jwt.sign({ id: result.id }, process.env.JWT_SECURITY);


    const UserCredentials = {
        id: result.id,
        username: result.username,
        email: result.email,
        name: result.name
    }

    res.cookie("accessToken", token, {
        httpOnly: true,
        samesite: "none"
    }).status(200).json(UserCredentials);



}

const logout = (req, res) => {
    console.log("Attempting to log out...");
    res.clearCookie("accessToken", {
        secure: true,
        samesite: "none"
    }).status(200).json("User has been loged out!!!");

}

module.exports = { login, register, logout }
