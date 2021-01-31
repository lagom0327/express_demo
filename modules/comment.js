const db = require("../db");
const commentModal = {
  getAll: (cb) => {
    db.query(
      `
      SELECT
      U.nickname,
      C.content
  FROM
      comments AS c
  LEFT JOIN users AS u
  ON
      u.username = c.username
      ORDER BY c.id DESC`,
      function (error, results, fields) {
        if (error) return cb(error);
        cb(null, results);
      }
    );
  },
  get: (id, cb) => {
    db.query(
      "SELECT * FROM comments WHERE id=?",
      [id],
      function (error, results, fields) {
        if (error) return cb(error);
        cb(null, results);
      }
    );
  },
  add: (username, content, cb) => {
    db.query(
      "INSERT INTO comments(username, content) values(?, ?)",
      [username, content],
      (err, results) => {
        if (err) return cb(err);
        cb(null, results);
      }
    );
  },
};
module.exports = commentModal;
