import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await loginService(email);

        if (!user) {
            return res.status(400).send({ message: "Invalid User or Password" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(400).send({ message: "Invalid User or Password" });
        }

        const token = generateToken(user.id);

        res.send({token});   
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export { login };