import { hash } from "argon2";
import User from "./user.model.js";

export const createAdmin = async () => {
    try {
        const admin = await User.findOne({ role: "ADMIN_ROLE" });

        if (!admin) {
            const hashedPassword = await hash("khszg&rsjUFUKE3466$sin");

            const admin = new User({
                name: "Harlin",
                surname: "Palacios",
                username: "hpalacios113",
                email: "hpalacios@gmail.com",
                password: hashedPassword,
                phone: "21326554",
                role: "ADMIN_ROLE",
            });

            await admin.save();
            console.log("ADMIN_ROLE creado correctamente");
        }
    } catch (error) {
        console.error("Error al inicializar el usuario ADMIN_ROLE:", error);
    }
};

