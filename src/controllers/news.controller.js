
import { createService, findAllService } from "../services/news.service.js"

const create = async (req, res) => {
    try {
        const {authorization} = req.headers;
        console.log(authorization);

        if (!authorization) {
            return res.send(401);
        }

        const parts = authorization.split(" ");

        const [schema, token] = parts;

        if (parts !== 2) {
            return res.send(401);
        }

        if (schema !== "Bearer") {
            return res.send(401);
        }

        console.log(parts);

        const {title, text, banner} = req.body;

        if(!title || !text || !banner) {
            res.status(400).send({message: "Submit all fields"});
        }

        await createService({
            title,
            text,
            banner,
            user: { _id: "64c07716d3409427fd9ae6eb" }
        })
        res.send(201)
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    
};

const findAll = async (req, res) => {
    const news = await findAllService();

    if (news.length === 0) {
        return res.status(400).send({ message: "Empity" })
    }

    res.send(news);
}

export { create, findAll }