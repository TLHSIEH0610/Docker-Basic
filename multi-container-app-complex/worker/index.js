const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000, // automatically reconnect to the server every 1000 milliseconds.
});

//if we ever have a client that's listening or publishing information on Redis, we have to make a duplicate connection,
//because when a connection is going to listen or subscribe or publish information, it cannot be used for other purposes.
const sub = redisClient.duplicate();

//plus the previous 2 numbers
const calculateFibonacci = (index) => {
  if (index < 2) return 1;
  return calculateFibonacci(index - 1) + calculateFibonacci(index - 2);
};

sub.on("message", (_, message) => {
  //key will be the index we received (message). this is submitted from the form
  redisClient.hset("value", message, calculateFibonacci(parseIne(message)));
});

//any time someone inserts a new value into Resdis. calculate the Fibonacci value and then toss that value back into the Redis's instance.
sub.subscribe("insert");
