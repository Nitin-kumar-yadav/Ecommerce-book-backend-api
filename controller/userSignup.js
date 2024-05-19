import User from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';


const userSignup = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.address ||
        !req.body.mobile
    ) {
        return res.status(400).json({
            message: "Please fill all fields"
        })
    }
    const { name, email, password, address, mobile } = req.body
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try {
        const user = new User({
            name,
            email,
            address,
            mobile,
            password: hashedPassword
        })
        const result = await user.save();
        if (!result) {
            return res.status(400).json({
                message: "User creation failed"
            })
        }
        res.status(200).json({
            message: "User created successfully",
        })
    } catch (error) {
        res.status(400).json({
            message: "User credentials occurred"
        })
    }

}

const getUsers = async (req, res) => {
    try {
        const { id } = req.params
        const userData = await User.findById(id)
        if (!userData) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }
        res.status(200).json(userData)
    } catch (error) {
        console.log(error)
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const validation = await User.findOne({ email });
    if (!validation) {
        return res.status(400).json({
            message: "User does not exist"
        })
    }
    const isPasswordCorrect = bcryptjs.compareSync(password, validation.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid Password"
        })
    }
    const token = jwt.sign({
        email: validation.email,
        id: validation._id
    }, process.env.JSON_TOKEN, { expiresIn: '15h' });
    res.status(200).json({
        message: "User logged in successfully",
        token: token,
        user: {
            id: validation._id,
        }

    })
}

export { userSignup, userLogin, getUsers }