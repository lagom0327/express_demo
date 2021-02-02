const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.User;
const saltRounds = 10;
const userController = {
  login: (req, res) => {
    res.render("user/login");
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash("errorMessage", "缺少必要欄位");
      return next();
    }

    User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        if (!user) {
          req.flash("errorMessage", "帳號或密碼不存在");
          return next();
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (err || !result) {
            req.flash("errorMessage", "密碼錯誤");
            return next();
          }
          req.session.username = user.username;
          req.session.userId = user.id;
          res.redirect("/");
          // result == true
        });
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },
  handleLogout: (req, res) => {
    req.session.username = null;
    req.session.userId = null;
    res.redirect("/");
  },
  register: (req, res) => {
    res.render("user/register");
  },
  handleRegister: (req, res, next) => {
    const { username, password, nickname } = req.body;
    if (!username || !password || !nickname) {
      req.flash("errorMessage", "缺少必要欄位");
      return next();
    }
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        req.flash("errorMessage", err.toString());
        return next();
      }
      User.create({
        username,
        nickname,
        password: hash,
      })
        .then((user) => {
          console.log("result", user);
          req.session.username = username;
          req.session.userId = user.id;
          res.redirect("/");
        })
        .catch((err) => {
          req.flash("errorMessage", err.toString());
          return next();
        });
    });
  },
};
module.exports = userController;
