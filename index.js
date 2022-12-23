const express = require("express");
const app = express();

//configurando o ejs

app.set("view engine", "ejs");
//configurando acesso aos arquivos estaticos(css, imagens e etc)
app.use(express.static("public"));
app.get("/:nome/:sexo/:idade", (req, res) => {
  var nome = req.params.nome;
  var sexo = req.params.sexo;
  var idade = req.params.idade;
  var produtos = [
    { nome: "batata", preco: 12 },
    { nome: "carne", preco: 16 },
    { nome: "miojo", preco: 2.5 },
    { nome: "lasanha", preco: 7.2 },
  ];
  if (nome && sexo && idade) {
    console.log("Entrei no true");
    res.render("index", {
      nome: nome,
      idade: idade,
      sexo: sexo,
      produtos: produtos,
    });
  } else {
    console.log("Entrei aqui");
    res.render("index", {
      nome: "Nenhum nome preenchido",
      idade: "null",
      sexo: "null",
    });
  }
});
app.listen(8080, () => {
  console.log("app rodando");
});
