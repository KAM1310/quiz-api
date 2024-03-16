var express = require("express");
var router = express();
const db = require("../models");
const jwt = require("jsonwebtoken");

router.post("/create", auth, async function (req, res, next) {
  console.log("=============================")
  const payload = req.body;
  // console.log(payload);

  const ids = Object.keys(payload).map(item => +item.replace(/ansID_/, ''));

  // console.log(ids);

  const questions = await db.question_table.findAll({
    where: {
      id: ids
    }
  });

  // console.log(questions);

  let correct = 0;
  let inCorrect = 0;
  for (const question of questions) {
    if (payload[`ansID_${question.id}`] == question.answer) {
      correct++;
    }
  }

  inCorrect = questions.length - correct;

  const score = (correct / questions.length) * 100;

  // console.log(score);

  const token = req.headers['authorization'];
  // console.log(token);
  const user = jwt.verify(token.replace(/Bearer/i, '').trim(), "secret", { ignoreExpiration: true });
  console.log(user)
  const userId = user.data.id
  const name = user.data.name

  // console.log(user.data.id, '==============');

  const re = await db.Quiz_table.create({ userId, score, name });
  // res.status(200).send(re);
  res.status(200).send(re);
});

// -----------------------------------------------------------

router.get("/list", async function (req, res, next) {
  const quiz_table = await db.Quiz_table.findAll({});
  res.send(quiz_table);
});

// -----------------------------------------------------------

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const quiz = await db.Quiz_table.update(payload, { where: { id } });
    if (quiz) {
      res.status(200).send(quiz);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await db.Quiz_table.destroy({ where: { id } });
    console.log(quiz);
    if (quiz) {
      res.status(200).send(quiz);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);

  }
});

module.exports = router;
