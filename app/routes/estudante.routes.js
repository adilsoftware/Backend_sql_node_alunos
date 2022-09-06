module.exports = app => {
  const estudante = require("../controllers/estudante.controller.js");
  const cors = require('cors');
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", estudante.create);

  // Retrieve all estudante
  router.get("/", estudante.findAll);

  // Retrieve all cpf estudante
  router.get("/cpf", estudante.findAllcpf);

  // Retrieve a single Tutorial with id
  router.get("/:id", estudante.findOne);

  // Update a Tutorial with id
  router.patch("/:id", estudante.update);

  // Delete a Tutorial with id
  router.delete("/:id", estudante.delete);

  // Delete all estudante
  router.delete("/", estudante.deleteAll);

  app.use('/api/estudante', router);
};
