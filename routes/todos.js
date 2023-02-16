const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

router.get("/todos/:userId", todoController.getTodos);
router.post("/todos/:userId", todoController.addItem);
router.put("/todos/:id", todoController.updateItem);
router.delete("/todos/:id", todoController.deleteItem);
router.post("/translate", todoController.translateTodo);

module.exports = router;
