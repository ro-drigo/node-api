//incluindo o express
const express = require('express');
//incluindo mongoose
const mongoose = require('mongoose');
//incluindo models
require("./models/Artigo");
const Artigo = mongoose.model('artigo');
//criando constante para usar o express
const app = express();

//permitir express a trabalhar com json
app.use(express.json());

//Conexão com o bd
mongoose.connect('mongodb://localhost/celke', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso");
}).catch((erro) => {
    console.log("Conexão com MongoDB deu errado");
});


//Criando rotas
//listando dados do BD
app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo foi encontrado!"
        })
    })
});

//registering on BD
app.post("/artigo", (req, res) => {
    //registrando no banco
    const artigo = Artigo.create(req.body, (err) =>{
        //verificando se registrou ou não
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso"
        });

        return res.status(400).json({
            error: false,
            message: "Artigo foi cadastrado com sucesso"
        })
    })
});


//Criando servidor
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080");
});