const mongoose = require("mongoose");

const connectDatabase = () => {
    console.log("Aguardando conexão");

    mongoose.connect("mongodb+srv://root:root@cluster0.jbultvc.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
    );

}

module.exports = connectDatabase;