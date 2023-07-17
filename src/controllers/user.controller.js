
const create = (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({ message: "campos não preenchidos" });
    }


    res.status(201).send({
        message: "Usuario criado com sucesso",
        user: {
            name,
            username,
            email, //password não enviado na resposta
            avatar,
            background
        }
    })
};

module.exports = { create }