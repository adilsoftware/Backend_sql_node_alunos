const Estudante = require("../models/estudante.model.js");

// Cria e salva um novo Estudante
exports.create = (req, res) => {
  // Valida a requisição
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode ficar vazio!"
    });
  }

  
//Cria um estudante
  const estudante = new Estudante({
    nome: req.body.nome,
    email: req.body.email,
    cpf: req.body.cpf || false
  });

// Salva o estudante no banco de dados
  Estudante.create(estudante, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao criar o Estudante."
      });
    else res.send(data);
  });
};

// Recupera todos os Estudantes do banco de dados (com condição).
exports.findAll = (req, res) => {
  const nome = req.query.nome;

  Estudante.getAll(nome, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os estudantes."
      });
    else res.send(data);
  });
};

// Encontra um único Estudante por Id
exports.findOne = (req, res) => {
  Estudante.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Estudante não encontrado com id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao recuperar o estudante com id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// encontra todos os estudantes publicados
exports.findAllcpf = (req, res) => {
  Estudante.getAllcpf((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao recuperar os estudantes."
      });
    else res.send(data);
  });
};

// Atualiza um Estudante identificado pelo id na requisição
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode ficar vazio!"
    });
  }

  console.log(req.body);

  Estudante.updateById(
    req.params.id,
    new Estudante(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Estudante não encontrado com id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar o estudante com id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Excluir um Estudante com o id especificado na solicitação
exports.delete = (req, res) => {
  Estudante.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Estudante não encontrado com id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Não foi possível excluir o estudante com id " + req.params.id
        });
      }
    } else res.send({ message: `Estudante foi deletado com sucesso!` });
  });
};

// Excluir todos os estudantes do banco de dados.
exports.deleteAll = (req, res) => {
  Estudante.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao remover todos os estudantes."
      });
    else res.send({ message: `Todos os estudantes foram excluídos com sucesso!` });
  });
};
