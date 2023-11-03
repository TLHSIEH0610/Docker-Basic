const keys = require("./keys");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const redis = require("redis");

//Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Postgres
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  //create values table
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.log(err));
});

//Redis
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();

//Route

//get all data from Postgress(table name: value)
app.get("/values/all", async (_, res) => {
  const values = await pgClient.query("SELECT * from values");
  res.send(values.rows);
});

//get all data from redis
app.get("/values/current", (_, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

//API for form submit
app.post("/values", async (req, res) => {
  const index = req.body.index;

  //only allow simple calculation
  if (parseInt(index) > 40) {
    return res.status(422).send("Index too heigh");
  }

  //save the index into redis
  redisClient.hset("values", index, "Noting Yet!");
  //wake up the worker process
  redisPublisher.publish("insert", index);
  //save index into Postgress.the $1 is a placeholder for the value(the [index] variable) you are passing in
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.send({ working: true });
});
