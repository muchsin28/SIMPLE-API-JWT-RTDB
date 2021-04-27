require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const Router = require("./router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send(`Simple Login API => <a href="/api">/api</a>`);
});
app.use("/api", Router);

app.listen(PORT, () => {
  console.log(`Listen on http://localhost:${PORT}`);
});
