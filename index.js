const express = require("express");
const app = express();

//configurando o ejs

app.set("view engine", "ejs");
//configurando acesso aos arquivos estaticos(css, imagens e etc)
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});
app.listen(8080, () => {
  console.log("app rodando");
});
