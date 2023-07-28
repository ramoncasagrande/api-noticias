
import { createService, findAll } from "../services/news.service"

const create = async (req, res) => {
    try {
        const {title, text, banner} = req.body;

        if(!title || !text || !banner) {
            res.status(400).send({message: "Submit all fields"});
        }

        await createService({
            title,
            text,
            banner,
            id: "adicionar id aqui"
        })
        res.send(201)
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    
};

const findAll = (req, res) => {
    const news = [];
    res.send(news);
}