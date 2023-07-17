const express = require("express");
const app = express();

const cors = require("cors");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/ECOM-MVC", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Successfully ");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

const user_routes = require("./routes/route");

app.use("/api", user_routes);

app.listen(5000, function () {
  console.log("Server is running on the port no:5000");
});
