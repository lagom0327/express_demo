const todoModal = require("../modules/todos");
const todoController = {
  getAll: (req, res) => {
    todoModal.getAll((err, results) => {
      if (err) console.log(err);
      res.render("todos", {
        todos: results,
      });
    });
  },
  get: (req, res) => {
    const id = req.params.id;
    todoModal.get(id, (err, results) => {
      if (err) console.log(err);
      res.render("todo", {
        todo: results[0],
      });
    });
  },
};
module.exports = todoController;
