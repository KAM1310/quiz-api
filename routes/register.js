var express = require("express");
var router = express();
const db = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  // res.send('test');
  const payload = req.body;

  payload.password = md5(payload.password);
  try {
    const user = await db.Register_user.create(payload);
    if (user) {
      const token = jwt.sign(
        {
          data: user,
        },
        "secret",
        { expiresIn: 60 }
      );
      res.status(200).json({ token, userInfo: user });
      // res.status(200).send(user);
      return;
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await db.Register_user.findOne({
      //it check for the person whoes name phone number is match with phoneNumber and get it .
      where: {
        phoneNumber: phoneNumber,
      },
    });

    console.log(user);

    if (!user) {
      throw new Error("please sign-up");
    }
    if (user.password !== md5(password)) {
      throw Error("wrong password");
    } else {
      const token = jwt.sign(
        {
          data: user,
        },
        "secret",

        { expiresIn: 60 }
      );
      res.status(200).json({ token, userInfo: user });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
