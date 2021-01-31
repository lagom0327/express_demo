const db = require("../db");
const todoModal = {
  // getAll: (cb) => {
  //   db.query("SELECT * FROM users", function (error, results, fields) {
  //     if (error) return cb(error);
  //     cb(null, results);
  //   });
  // },
  get: (username, cb) => {
    db.query(
      "SELECT * FROM users WHERE username=?",
      [username],
      function (error, results, fields) {
        if (error) return cb(error);
        cb(null, results[0]);
      }
    );
  },
  add: (user, cb) => {
    const { username, password, nickname } = user;
    db.query(
      "INSERT INTO users(username, password, nickname) values(?, ?, ?)",
      [username, password, nickname],
      (err, results) => {
        if (err) return cb(err);
        cb(null, results);
      }
    );
  },
};
module.exports = todoModal;
