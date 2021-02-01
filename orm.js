const { Sequelize, DataTypes } = require("sequelize");
const dbData = require("./db");
const { database, user, host, password } = dbData;
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
});

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

const Comment = sequelize.define("Comment", {
  content: {
    type: DataTypes.STRING,
  },
});
// 一個使用者有很多的 comment
// 自動在 comment 裡加上 userId
User.hasMany(Comment);
Comment.belongsTo(User);
sequelize.sync().then(() => {
  // console.log("creadted done", res);
  Comment.findOne({
    where: {
      id: 2,
    },
    include: User,
  }).then((comment) => {
    console.log("comment", JSON.stringify(comment, null, 2));
  });
});

// `sequelize.define` also returns the model
