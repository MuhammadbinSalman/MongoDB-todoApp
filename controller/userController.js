const User = require("../model/UserSchema")
var bcrypt = require('bcryptjs'); 

//function for hashing passwords

async function hashPasswords(password) {
    try {
        const hpassword = await bcrypt.hash(password, 2);
        return hpassword;
    } catch (error) {
        res.status(402).send(error.message);
    }
}

//function for comparing passwords

const create_user = async (req, res) => {
    const hashPassword = await hashPasswords(req.body.password);
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            role: req.body.role
        })
        const userData = await User.findOne({ email: req.body.email });
        if (userData) {
            res.status(200).send({ success: false, message: "User already exists" });
        } else {
            let newUser = await user.save();
            res.status(200).send({ success: true, message: "User doesn't exists, new user created", newUser });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

//controller for user login

const login_user = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userData = await User.findOne({ email: email });
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                res.status(200).send({ success: true, message: "User logged in successfully", userData });
            } else {
                res.status(203).send({ success: false, message: "Incorrect password" });
            }
        } else {
            res.status(202).send({ success: false, message: "User not found" });
        }
    }
    catch (err) {
      res.status(400).send(err.message);
    }
}


module.exports = {
    create_user,
    login_user,
}