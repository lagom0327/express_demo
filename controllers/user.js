const userModal = require("../modules/user");
const bcrypt = require("bcrypt");
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
    userModal.get(username, (err, user) => {
      if (err) {
        req.flash("errorMessage", err.toString());
        return next();
      }
      console.log("user", user);
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
        res.redirect("/");
        // result == true
      });
    });
  },
  handleLogout: (req, res) => {
    req.session.username = null;
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
      userModal.add(
        {
          username,
          nickname,
          password: hash,
        },
        (error, result) => {
          if (error) {
            req.flash("errorMessage", error.toString());
            return next();
          }
          req.session.username = username;
          res.redirect("/");
        }
      );
    });
  },
};
module.exports = userController;
