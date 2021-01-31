const commentModal = require("../modules/comment");
const commentController = {
  index: (req, res, next) => {
    commentModal.getAll((err, results) => {
      if (err) {
        console.log(err);
      }
      res.render("index", {
        comments: results,
      });
    });
  },
  getAll: (req, res) => {
    commentModal.getAll((err, results) => {
      if (err) console.log(err);
      // res.send(results);
      res.render("comments", {
        comments: results,
      });
    });
  },
  get: (req, res) => {
    const id = req.params.id;
    commentModal.get(id, (err, results) => {
      if (err) console.log(err);
      // res.send(results[0]);
      res.render("comment", {
        comment: results[0],
      });
    });
  },
  add: (req, res) => {
    const { username } = req.session;
    const { content } = req.body;
    if (!username || !content) {
      return res.redirect("/");
    }
    commentModal.add(username, content, (err, result) => {
      if (err) {
        console.log(err);
        return res.redirect("/");
      }
      res.redirect("/");
    });
    // res.end(content);
  },
};
module.exports = commentController;
