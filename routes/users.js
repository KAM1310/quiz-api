var express = require("express");
var router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");

router.get("/list", async function (req, res, next) {
  const { q } = req.query;
  const where = {};
  if (q) {
    where[Op.or] = [
      {
        name: {
          [Op.like]: `%${q}%`,
        },
      },
      {
        phoneNumber: {
          [Op.like]: `%${q}%`,
        },
      },
    ];
  }

  let { limit, page } = req.query;
  if (!limit) {
    limit = 5;
  }
  if (!page) {
    page = 1;
  }

  // type casting
  page = +page;
  limit = +limit;

  const offset = (page - 1) * limit;
  const ques = await db.Register_user.findAndCountAll({ limit, offset, where });
  // const ques = await db.Register_user.findAll({ where });
  res.status(200).send(ques);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const quiz = await db.Register_user.update(payload, { where: { id } });
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

  const user = await db.Register_user.findOne({ where: { id } });
  if (user) {
    await user.destroy();
  } else {
    res.send("404 - record not found");
    return;
  }

  res.send("User deleted successfully...!!!");
});

module.exports = router;
