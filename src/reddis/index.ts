var redis = require('redis');
// var client = redis.createClient(); // this creates a new client
var client = redis.createClient({
    host :  process.env.ENDPOINT_REDIS, 
    port : process.env.PORT_REDIS,
    password : process.env.PASS_REDIS
});
client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

client.set('my test key', 'my test value', redis.print);
client.get('my test key', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('GET result ->' + result);
});
export default client