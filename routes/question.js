var express = require("express");
var router = express();
const db = require("../models");
const md5 = require("md5");
// const { Jwt } = require('jsonwebtoken');
const jwt = require("jsonwebtoken");

router.post("/create", async function (req, res, next) {
  const payload = req.body;
  const re = await db.question_table.create(payload);
  res.status(200).send(re);
});

router.get("/list", async function (req, res, next) {
  const ques = await db.question_table.findAll({});
  res.send(ques);
});

module.exports = router;
