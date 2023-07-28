import News from "../models/News.js";

const createService = (body) => News.create(body);

const findAll = () => News.find();

export default { createService, findAll };