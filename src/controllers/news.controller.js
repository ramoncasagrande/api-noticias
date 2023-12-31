
import { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, findByUserService } from "../services/news.service.js"

const create = async (req, res) => {
    try {

        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            res.status(400).send({ message: "Submit all fields" });
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId
        })
        res.send(201)
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    try {

        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await findAllService(offset, limit);
        const total = await countNews();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: "Empity" })
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map((newsItem) => ({
                id: newsItem._id,
                title: newsItem.title,
                text: newsItem.text,
                banner: newsItem.banner,
                likes: newsItem.likes,
                comments: newsItem.comments,
                userName: newsItem.user.username,
                avatar: newsItem.user.avatar
            })),
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const topNews = async (req, res) => {

    try {
        const news = await topNewsService();

        if (!news) {
            return res.status(400).send({ message: "There is no post" })
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                userName: news.user.username,
                avatar: news.user.avatar
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const news = await findByIdService(id);

        return res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                userName: news.user.username,
                avatar: news.user.avatar
            }
        })

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const news = await searchByTitleService(title);

        if (news.length === 0){
            return res.status(400).send({message: "There are no news"})
        }

        return res.send({
            results: news.map((newsItem) => ({
                id: newsItem._id,
                title: newsItem.title,
                text: newsItem.text,
                banner: newsItem.banner,
                likes: newsItem.likes,
                comments: newsItem.comments,
                userName: newsItem.user.username,
                avatar: newsItem.user.avatar
            }))
        })

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const findByUser = async (req, res) => {
    try{
        const id = req.userId;
        const news = await findByUserService(id);

        return res.send({
            results: news.map((newsItem) => ({
                id: newsItem._id,
                title: newsItem.title,
                text: newsItem.text,
                banner: newsItem.banner,
                likes: newsItem.likes,
                comments: newsItem.comments,
                userName: newsItem.user.username,
                avatar: newsItem.user.avatar
            }))
        })

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export { create, findAll, topNews, findById, searchByTitle, findByUser }