const sql = require("./db.js");

// constructor
const Estudante = function(estudante) {
  this.nome = estudante.nome;
  this.email = estudante.email;
  this.cpf = estudante.cpf;
};

Estudante.create = (newEstudante, result) => {
  sql.query("INSERT INTO estudante SET ?", newEstudante, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created estudante: ", { id: res.insertId, ...newEstudante });
    result(null, { id: res.insertId, ...newEstudante });
  });
};

Estudante.findById = (id, result) => {
  sql.query(`SELECT * FROM estudante WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found estudante: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Estudante with the id
    result({ kind: "not_found" }, null);
  });
};

Estudante.getAll = (nome, result) => {
  let query = "SELECT * FROM estudante";

  if (nome) {
    query += ` WHERE nome LIKE '%${nome}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("estudante: ", res);
    result(null, res);
  });
};

Estudante.getAllcpf = result => {
  sql.query("SELECT * FROM estudante WHERE cpf=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("estudante: ", res);
    result(null, res);
  });
};

Estudante.updateById = (id, estudante, result) => {
  sql.query(
    "UPDATE estudante SET nome = ?, email = ?, cpf = ? WHERE id = ?",
    [estudante.nome, estudante.email, estudante.cpf, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Estudante with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated estudante: ", { id: id, ...estudante });
      result(null, { id: id, ...estudante });
    }
  );
};

Estudante.remove = (id, result) => {
  sql.query("DELETE FROM estudante WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Estudante with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted estudante with id: ", id);
    result(null, res);
  });
};

Estudante.removeAll = result => {
  sql.query("DELETE FROM estudante", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} estudante`);
    result(null, res);
  });
};

module.exports = Estudante;
