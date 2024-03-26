var express = require("express");
var router = express();
const db = require("../models");
const md5 = require("md5");
// const { Jwt } = require('jsonwebtoken');
const jwt = require("jsonwebtoken");
const { where, Op } = require("sequelize");

// create------------------
router.post("/create", async function (req, res, next) {
  const payload = req.body;
  const re = await db.question_table.create(payload);
  res.status(200).send(re);
});
// --------------------read
router.get("/list", async function (req, res, next) {

  const where = {};
  const { q } = req.query;

  if (q) {
    where[Op.or] = [
      {
        question: {
          [Op.like]: `%${q}%`
        }
      },
      {
        option1: {
          [Op.like]: `%${q}%`
        }
      },
      {
        option2: {
          [Op.like]: `%${q}%`
        }
      },
      {
        option3: {
          [Op.like]: `%${q}%`
        }
      },
      {
        option4: {
          [Op.like]: `%${q}%`
        }
      }]
  }
  const ques = await db.question_table.findAndCountAll({ where });
  // const ques = await db.question_table.findAll({});
  res.send(ques);
});
//-------------------update
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const ques = await db.question_table.update(payload, { where: { id } });
    if (ques) {
      res.status(200).send(ques);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
// ----------------------delte

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  const user = await db.question_table.findOne({ where: { id } });
  if (user) {
    await user.destroy();
  } else {
    res.send("404 - record not found");
    return;
  }

  res.send("User deleted successfully...!!!");
});

module.exports = router;