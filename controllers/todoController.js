const axios = require("axios");
const db = require("../models");

const Todo = db.todos;
const UserUsage = db.userusage;

exports.addItem = async (req, res) => {
  try {
    const { task } = req.body;
    const userId = req.params.userId;
    console.log("User id is ", userId);
    const body = [{ Text: task }];
    const response = await axios.post(
      `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en`,
      body,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": "ea086629b9834d06a8cf75417b2b70f0",
          "Ocp-Apim-Subscription-Region": "australiaeast",
        },
      }
    );

    const targetLanguague = response.data[0].detectedLanguage.text;
    const translation = response.data[0].translations[0].text;

    const todo = await Todo.create({
      task,
      translation,
      targetLanguague,
      userId,
    });

    // Update User Usage
    const count = await Todo.count({
      where: {
        userId: userId,
      },
    });

    const userusage = await UserUsage.findOne({
      where: { userId: userId },
    });

    userusage.update({ todoItemCount: count });

    res.status(200).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const { userId } = req.params;
    const todos = await Todo.findAll({
      where: {
        userId,
      },
    });

    // Update User Usage
    const count = await Todo.count({
      where: {
        userId: userId,
      },
    });

    const userusage = await UserUsage.findOne({
      where: { userId: userId },
    });

    userusage.update({ todoItemCount: count });

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, completed } = req.body;
    const todo = await Todo.findByPk(id);
    await todo.update({ task, completed });
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    await todo.destroy();

    // todo item counts in UserUsage will be updated via getTodos endpoint

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.translateTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(
      `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en`,
      { Text: text },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.MICROSOFT_TRANSLATOR_API_KEY,
          "Ocp-Apim-Subscription-Region": "australiaeast",
          "Content-Type": "application/json",
        },
      }
    );
    const translatedText = response.data[0].text;
    res.status(200).json({ translatedText });
  } catch (error) {
    res.status(500).json({ error });
  }
};
