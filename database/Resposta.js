const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {
  resposta: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  id_Pergunta: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Resposta.sync({ force: false }).then(() => {}); // force:false verifica se a tabela já foi criada

module.exports = Resposta;
