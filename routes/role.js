var express = require("express");
var router = express();
const db = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

router.post("/create", async function (req, res, next) {
  const payload = req.body;
  const re = await db.Role.create(payload);
  res.status(200).send(re);
});

router.get("/list", async function (req, res, next) {
  const ques = await db.Role.findAll({});
  res.send(ques);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const ques = await db.Role.update(payload, { where: { id } });
    if (ques) {
      res.status(200).send(ques);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  const user = await db.Role.findOne({ where: { id } });
  if (user) {
    await user.destroy();
  } else {
    res.send("404 - record not found");
    return;
  }

  res.send("User deleted successfully...!!!");
});

module.exports = router;
