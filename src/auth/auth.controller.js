import { verify, hash } from "argon2"; // Import hash
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";


export const loginA = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}, {password: password}]
        })

        if(!user){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login creado exitosamente",
            userDetails: {
                token: token,
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "error en el servidor",
            error: err.message
        })
    }
}

export const createAdmin = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const hashedPassword = await hash(password);
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            role: 'admin'
        });

        await newUser.save();

        const token = await generateJWT(newUser.id);

        return res.status(200).json({
            message: "Admin created successfully",
            userDetails: {
                token: token,
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};