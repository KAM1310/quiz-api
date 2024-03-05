var express = require("express");
var router = express.Router();
const db = require("../models");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.get("/list", async function (req, res, next) {
  const ques = await db.Register_user.findAll({});
  res.send(ques);
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

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const quiz = await db.Register_user.destroy({ where: { id } });
//     console.log(quiz);
//     if (quiz) {
//       res.status(200).send(quiz);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

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
