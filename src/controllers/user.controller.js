
const userService = require("../services/user.service");
/* const mongoose = require("mongoose"); */

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).send({ message: "campos não preenchidos" });
        }

        const user = await userService.createService(req.body);

        if (!user) {
            return res.status(400).send({ message: "Erro na criação do usuário" });
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
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService();

        if (users.length === 0) {
            return res.status(400).send({ message: "Empity" })
        }

        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message })
    };
};

const findById = async (req, res) => {

    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: err.message })
    };
};

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;
        const { id, user } = req;

        if (!name && !username && !email && !password && !avatar && !background) {
            res.status(400).send({ message: "preencha pelo menos um campo" });
        }

        await userService.updateService(id, name, username, email, password, avatar, background);

        res.send({ message: "Atualizado com sucesso" });
    } catch (err) {
        res.status(500).send({ message: err.message })
    };
}

module.exports = { create, findAll, findById, update }