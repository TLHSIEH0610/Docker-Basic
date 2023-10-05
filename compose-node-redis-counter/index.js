const express = require("express");
const redis = require("redis");

const port = 8081;
const app = express();
const client = redis.createClient({
  // name of the container.
  host: "redis-server",
  port: 6379,
});
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send(`Number of visists is ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
