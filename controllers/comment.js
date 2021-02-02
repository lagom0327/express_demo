const db = require("../models");
const Comment = db.Comment;
const User = db.User;
const commentController = {
  index: (req, res, next) => {
    Comment.findAll({
      include: User,
    })
      .then((comments) => {
        console.log("comm", JSON.stringify(comments, null, 2));
        res.render("index", {
          comments,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  get: (req, res) => {
    const id = req.params.id;
    Comment.findByPk(id)
      .then((user) => {
        res.render("comment", {
          comment: results[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  add: (req, res) => {
    const { userId } = req.session;
    const { content } = req.body;
    if (!userId || !content) {
      return res.redirect("/");
    }
    Comment.create({
      content,
      userId,
    })
      .then((comment) => {
        console.log("create comment", comment);
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        return res.redirect("/");
      });
    // res.end(content);
  },
  delete: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    })
      .then((comment) => {
        return comment.destroy();
      })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        // req.flash("errorMessage", err.toString());
        res.redirect("/");
      });
  },
  update: (req, res) => {
    Comment.findByPk(req.params.id).then((comment) => {
      res.render("update", {
        comment,
      });
    });
  },
  handleUpdate: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    })
      .then((comment) => {
        return comment.update({
          content: req.body.content,
        });
      })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        // req.flash("errorMessage", err.toString());
        res.redirect("/");
      });
  },
};
module.exports = commentController;
