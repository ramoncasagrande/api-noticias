
const userService = require("../services/user.service")

const create = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({ message: "campos não preenchidos" });
    }

    const user = await userService.create(req.body);

    if (!user) {
        return res.status(400).send({message: "Erro na criação do usuário"});
    }


    res.status(201).send({
        message: "Usuario criado com sucesso",
        user: {
            id: user._id,
            name,
            username,
            email, //password não enviado na resposta
            avatar,
            background
        }
    })
};

module.exports = { create }