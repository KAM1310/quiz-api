var express = require("express");
var router = express();
const db = require("../models");

router.post("/create", async function (req, res, next) {
  const payload = req.body;
  const re = await db.Quiz_table.create(payload);
  res.status(200).send(re);
});

router.get("/list", async function (req, res, next) {
  const quiztable = await db.Quiz_table.findAll({});
  res.send(quiztable);
});

module.exports = router;
