const express = require("express");
const sequelize = require("./config/db");
const { User, Task } = require("./models");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));


app.use("/auth", require("./routes/auth"));


sequelize.sync({ alter: true }).then(() => {
  console.log("Baza spremna sa FK");
  app.listen(3000, () => console.log("Server radi na 3000"));
});
