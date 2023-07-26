import mongoose from "mongoose";

const connectDatabase = () => {
    console.log("Aguardando conexão...");

    mongoose.connect("mongodb+srv://root:root@cluster0.jbultvc.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => console.log("MongoDB Atlas conectado!")).catch((error) => console.log(error));

};

export default connectDatabase;