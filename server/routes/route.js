const express = require("express");
const user_route = express();
const User = require("../model/userSchema");

user_route.use(express.json());
user_route.use(express.urlencoded({ extended: true }));

user_route.post("/users", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      type: req.body.type,
    });

    const userData = await User.findOne({ email: req.body.email });

    if (userData) {
      res
        .status(200)
        .send({ success: true, msg: "This email is already exits." });
    } else {
      const user_data = await user.save();
      res.status(200).send({ success: true, data: user_data });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

user_route.get("/users", async (req, res) => {
  try {
    const getData = await User.find().lean();
    res.status(200).send({ success: true, data: getData });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = user_route;
