// const USerModel = require("../Models/User");
// const bcrypt = require('bcrypt')

// const signup = async()=>{
//     try {
//         const{name, email,password} = req.body;
//         const user = await USerModel.findOne({ email })
//         if(user){
//             return res.status(409).json({message:"User is Already exist, you can Login", success:false})
//         }
//         const userModel = new USerModel({ name, email, password });
//         userModel.password = await bcrypt.hash(password, 10)
//         await userModel.save();
//         res.status(201).json({message:"signup Successfully", success:true})
//     } catch (error) {
//         error.status(500).json({message:"internal server error", success:false})
//     }
// }


// module.exports={
//     signup
// }


const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists, you can login",
                success: false
            });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true,
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        const errorMSg ='Auth failed email or password is wrong'
        if (!user) {
            return res.status(403).json({
                message: errorMSg,
                success: false
            });
        }

        const isPassEqual= await bcrypt.compare(password, user.password)
        if(!isPassEqual){
            return res.status(403).json({
                message: errorMSg,
                success: false
            });
        }

        const jwtToken= jwt.sign({email:user.email, id:user.id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}

        )

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name:user.name
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login 
};
