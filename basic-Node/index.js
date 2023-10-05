const express = require("express");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.listen(port, () => {
  console.log("listening port", port);
});
