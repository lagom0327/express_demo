const db = require("../db");
const todoModal = {
  getAll: (cb) => {
    db.query("SELECT * FROM todos", function (error, results, fields) {
      if (error) return cb(error);
      cb(null, results);
    });
  },
  get: (id, cb) => {
    db.query(
      "SELECT * FROM todos WHERE id=?",
      [id],
      function (error, results, fields) {
        if (error) return cb(error);
        cb(null, results);
      }
    );
  },
};
module.exports = todoModal;
