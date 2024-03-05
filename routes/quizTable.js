var express = require("express");
var router = express();
const db = require("../models");

router.post("/create", async function (req, res, next) {
  const payload = req.body;
  const re = await db.Quiz_table.create(payload);
  res.status(200).send(re);
});

router.get("/list", async function (req, res, next) {
  const quiz_table = await db.Quiz_table.findAll({});
  res.send(quiz_table);
});

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

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  const user = await db.Quiz_table.findOne({ where: { id } });
  if (user) {
    await user.destroy();
  } else {
    res.send("404 - record not found");
    return;
  }

  res.send("User deleted successfully...!!!");
});

module.exports = router;
