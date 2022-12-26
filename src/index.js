const express = require("express");
const db = require("./models");
const response = require('./middlewares/response');

const authController = require("./controllers/auth.js");
const app = express();
const port = 3001;

app.use(response);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/auth", authController);

app.get("/", (req, res) => {
  return res.json("API runing...");
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
