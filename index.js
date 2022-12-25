const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
//configurando o ejs

connection
  .authenticate()
  .then(() => {
    console.log("Conexão realizada com sucesso");
  })
  .catch((erro) => {
    console.log("Erro na conexão");
  });

app.set("view engine", "ejs");
//configurando acesso aos arquivos estaticos(css, imagens e etc)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // configura para coletar dados de formularios
app.use(express.json()); //configura para receber arquivos json

app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});
app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});
app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => res.redirect("/"));
});

app.post("/responder", (req, res) => {
  var resposta = req.body.resposta;
  var id_Pergunta = req.body.id_Pergunta;
  Resposta.create({
    resposta: resposta,
    id_Pergunta: id_Pergunta,
  }).then(() => res.redirect("/pergunta/" + id_Pergunta));
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      Resposta.findAll({
        raw: true,
        order: [["id", "DESC"]],
        where: { id_Pergunta: id },
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});
app.listen(3000, () => {
  console.log("app rodando");
});
